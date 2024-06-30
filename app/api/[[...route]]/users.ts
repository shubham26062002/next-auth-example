import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import bcrypt from "bcryptjs"
import { verifyAuth } from "@hono/auth-js"
import { sql } from "drizzle-orm"
import { deleteCookie } from "hono/cookie"

import { db } from "@/drizzle/db"
import { editProfileFormSchema, resetPasswordFormSchema, signUpFormSchema } from "@/lib/form-schemas"
import { getUserByEmail, getUserById } from "@/lib/users-utils"
import { users } from "@/drizzle/schema"

const app = new Hono()
    .post("/", zValidator("json", signUpFormSchema), async (c) => {
        const { name, email, password } = c.req.valid("json")

        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return c.json({
                error: "User already exists",
            }, 400)
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const [newUser] = await db.insert(users).values({
            name,
            email,
            passwordHash,
        }).returning()

        return c.json(newUser, 201)
    })
    .patch("/", verifyAuth(), zValidator("json", editProfileFormSchema), async (c) => {
        const auth = c.get("authUser")

        if (!auth.session.user) {
            return c.json({
                error: "Unauthorized",
            }, 401)
        }

        const { name, image } = c.req.valid("json")

        const [updatedUser] = await db.update(users).set({
            name,
            image,
        }).where(sql`${users.id} = ${auth.token?.sub}`).returning()

        return c.json(updatedUser, 200)
    })
    .patch("/reset-password", verifyAuth(), zValidator("json", resetPasswordFormSchema), async (c) => {
        const auth = c.get("authUser")

        if (!auth.session.user) {
            return c.json({
                error: "Unauthorized",
            }, 401)
        }

        const existingUser = await getUserById(auth.token?.sub!)

        if (!existingUser) {
            return c.json({
                error: "User not found",
            }, 404)
        }

        if (!existingUser.passwordHash) {
            return c.json({
                error: "Password not set",
            }, 400)
        }

        const { oldPassword, newPassword } = c.req.valid("json")

        if (oldPassword === newPassword) {
            return c.json({
                error: "Password cannot be the same as the old password",
            }, 400)
        }

        const isValidPassword = await bcrypt.compare(oldPassword, existingUser.passwordHash)

        if (!isValidPassword) {
            return c.json({
                error: "Password is invalid",
            }, 400)
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10)

        const [updatedUser] = await db.update(users).set({
            passwordHash: newPasswordHash,
        }).where(sql`${users.id} = ${auth.token?.sub}`).returning()

        return c.json(updatedUser, 200)
    })
    .delete("/", verifyAuth(), async (c) => {
        const auth = c.get("authUser")

        if (!auth.session.user) {
            return c.json({
                error: "Unauthorized",
            }, 401)
        }

        await db.delete(users).where(sql`${users.id} = ${auth.token?.sub}`)

        deleteCookie(c, "authjs.session-token")

        return c.json({}, 204)
    })

export default app