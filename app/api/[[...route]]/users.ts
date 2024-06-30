import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import bcrypt from "bcryptjs"

import { db } from "@/drizzle/db"
import { signUpFormSchema } from "@/lib/form-schemas"
import { getUserByEmail } from "@/lib/users-utils"
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

export default app