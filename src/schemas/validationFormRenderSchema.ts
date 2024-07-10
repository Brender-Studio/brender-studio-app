import { z } from "zod"

export const PythonEnvVars = z.object({
    user_main_script_path: z.string(),
    efs_blender_file_path: z.string(),
    efs_blender_output_folder_path: z.string(),
    blender_executable_path: z.string(),
    use_eevee: z.string(),
    bucket_name: z.string(),
    bucket_key: z.string(),
    use_gpus: z.string(),
})

export const CustomEnvVars = z.array(z.object({
    name: z.string(),
    value: z.string()
}))

export const FrameRange = z.object({
    start: z.coerce.number().min(0, {
        message: 'Frame range start must be greater than 0'
    }).positive(),
    end: z.coerce.number().min(0, {
        message: 'Frame range end must be greater than 0'
    }).positive(),
    step: z.coerce.number().min(1, {
        message: 'Frame range step must be greater than 1'
    }).positive(),
    fps: z.coerce.number().min(1, {
        message: 'FPS must be greater than 1'
    }).positive(),
})

export const AspectRatio = z.object({
    width: z.coerce.number().min(1, {
        message: 'Aspect ratio width must be greater than 0'
    }).max(200, {
        message: 'Aspect ratio width must be less than 200'
    }),
    height: z.coerce.number().min(1, {
        message: 'Aspect ratio height must be greater than 0'
    }).max(200, {
        message: 'Aspect ratio height must be less than 200'
    }),
})

export const Resolution = z.object({
    width: z.coerce.number().min(1, {
        message: 'Resolution width must be greater than 0'
    }),
    height: z.coerce.number().min(1, {
        message: 'Resolution height must be greater than 0'
    }),
    percentage: z.coerce.number().min(1, {
        message: 'Resolution percentage must be greater than 0'
    }),
})

export const ProjectName = z.string().min(3, {
    message: 'Project name is too short, must be between 3 and 50 characters'
}).max(50, {
    message: 'Project name is too long, must be between 3 and 50 characters'
}).regex(/^[a-zA-Z0-9_-]*$/, {
    message: 'Project name must not contain spaces or special characters'
})

export const JobSettings = z.object({
    job_definition: z.string().optional(),
    job_queue: z.string().optional(),
    number_gpus: z.string().optional(),
    array_size: z.string().optional(),
    vcpus: z.string().optional(),
    memory: z.string().optional(),
    timeout: z.string().optional(),
    job_attempts: z.string().optional(),
    // job_priority: z.string().optional(),
})

export const Output = z.object({
    color: z.object({
        color_depth: z.string().optional(),
        color_mode: z.string().optional(),
    }),
    output_format: z.string(),
    compression: z.coerce.number().min(1, {
        message: 'Compression must be greater than 0'
    }).max(100, {
        message: 'Compression must be less than 100'
    }),
})

export const CyclesConfig = z.object({
    denoise_config: z.object({
        algorithm: z.string(),
        denoise_pass: z.string(),
        denoise_prefilter: z.string(),
        noise_threshold: z.coerce.number().min(0.001, {
            message: 'Noise threshold must be greater than 0.001'
        }).max(1, {
            message: 'Noise threshold must be less than 0'
        })
    }).optional(),
    light_paths: z.object({
        caustics: z.object({
            // validate no empty input value
            filter_glossy: z.coerce.number().min(0, {
                message: 'Filter glossy must be greater than "0"'
            }).max(10, {
                message: 'Filter glossy must be less than 10'
            }).positive(),
            reflective: z.boolean(),
            refractive: z.boolean(),
        }),
        clamping: z.object({
            direct: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).positive(),
            indirect: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).positive()
        }),
        max_bounces: z.object({
            diffuse_bounces: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
            glossy_bounces: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
            total: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
            transmission_bounces: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
            transparent_max_bounces: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
            volume_bounces: z.coerce.number().min(0, {
                message: 'Total bounces must be greater than 0'
            }).max(1024, {
                message: 'Total bounces must be less than 1024'
            }).positive(),
        }),
    }),
    samples: z.coerce.number().min(1, {
        message: 'Samples must be greater than 0'
    }),
})

// export const EveeConfig = z.object({
//     taa_samples: z.coerce.number().optional(),
//         shadows: z.object({
//             cube_size: z.string().optional(),
//             cascade_size: z.string().optional(),
//             high_bitdepth: z.boolean().optional(),
//             soft_shadows: z.boolean().optional(),
//         })
//     })

export const Ses = z.object({
    ses_email: z.string(),
    enable_notifications: z.boolean(),
    animation_preview: z.object({
        animation_preview_full_resolution: z.boolean(),
        output_quality: z.string(),
        encoding_speed: z.string(),
        autosplit: z.boolean(),
        ffmpeg_format: z.string(),
    }),
})
