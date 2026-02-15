import { z } from 'zod'

export const ValidAuthSchema = z.object({
    token: z.string()
}).strict()

export const InvalidAuthSchema = z.object({
    reason: z.string()
}).strict()