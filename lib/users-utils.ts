import { sql } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"

export const getUserByEmail = async (email: string) => {
    const [user] = await db.select().from(users).where(sql`${users.email} = ${email}`)

    if (!user) {
        return null
    }

    return user
}

export const getUserById = async (id: string) => {
    const [user] = await db.select().from(users).where(sql`${users.id} = ${id}`)

    if (!user) {
        return null
    }

    return user
}
