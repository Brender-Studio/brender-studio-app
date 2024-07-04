import { z } from "zod";


export const deployStackSchema = z.object({
    // stackname exists in the form
    // validate no empty spaces or special characters, but - is allowed
    stackName: z.string().min(2, {
        message: "Stack name is too short."
    }).max(20, {
        message: "Stack name is too long."
    }).regex(/^[a-zA-Z0-9-]*$/, {
        message: "Stack name must not contain spaces or special characters.",
    }),
    isPrivate: z.boolean(),
    blenderVersions: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one Blender Version.",
    }),
    region: z.string(),
    profile: z.string(),
    terms: z.boolean().refine((value) => value, {
        message: "You have to agree to the terms and conditions.",
    }),
    maxvCpus: z.object({
        onDemandGPU: z.coerce.number().min(0).max(1000).refine((value) => value > 0, {
            message: "You have to select at least one GPU."
        }),
        onDemandCPU: z.coerce.number().min(0).max(1000).refine((value) => value > 0, {
            message: "You have to select at least one CPU."
        }),
        spotCPU: z.coerce.number().min(0).max(1000).refine((value) => value > 0, {
            message: "You have to select at least one CPU."
        }),
        spotGPU: z.coerce.number().min(0).max(1000).refine((value) => value > 0, {
            message: "You have to select at least one GPU."
        }),
    }),
    spotBidPercentage: z.object({
        spotCPU: z.coerce.number().min(0).max(100).refine((value) => value > 0, {
            message: "You have to select a value between 1 and 100."
        }),
        spotGPU: z.coerce.number().min(0).max(100).refine((value) => value > 0, {
            message: "You have to select a value between 1 and 100."
        }),
    }),

})
