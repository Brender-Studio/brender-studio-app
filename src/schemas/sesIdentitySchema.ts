import {z } from "zod";


export const sesIdentitySchema = z.object({
    identity: z.string().email({ message: "Invalid email address." }).refine((value) => value.trim().length > 0, {
        message: "Identity email is required.",
    }),
})