import { z } from "zod";



export const cliProfileSchema = z.object({
    profileName: z.string().min(2, { message: "Profile name is too short." }).max(20, { message: "Profile name is too long." }).refine((value) => value.trim().length > 0, {
        message: "Profile name is required.",
    }).refine((value) => /^[a-z0-9-]+$/.test(value), {
        message: "Profile name must be lowercase and contain only letters, numbers, and dashes.",
    }),
    accessKey: z.string().min(20, { message: "Access key is too short." }).max(40, { message: "Access key is too long." }).refine((value) => value.trim().length > 0, {
        message: "Access key is required.",
    }),
    secretKey: z.string().min(40, { message: "Secret key is too short." }).max(80, { message: "Secret key is too long." }).refine((value) => value.trim().length > 0, {
        message: "Secret key is required.",
    }),
})