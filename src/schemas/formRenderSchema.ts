import { z } from "zod";



export const formRenderSchema = z.object({
    type: z.enum(['frame', 'animation', 'custom_render_python']),
    // validate no empty spaces or special characters, but - or _ is allowed
    project_name: z.string().min(3, {
        message: 'Project name is too short, must be between 3 and 50 characters'
    }).max(50, {
        message: 'Project name is too long, must be between 3 and 50 characters'
    }).regex(/^[a-zA-Z0-9_-]*$/, {
        message: 'Project name must not contain spaces or special characters'
    }),
    python_env_vars: z.object({
        user_main_script_path: z.string().optional(),
        efs_blender_file_path: z.string().optional(),
        efs_blender_output_folder_path: z.string().optional(),
        blender_executable_path: z.string().optional(),
        use_eevee: z.string().optional(),
        bucket_name: z.string().optional(),
        bucket_key: z.string().optional(),
        use_gpus: z.string().optional(),
    }).optional(),
    custom_env_vars: z.array(z.object({
        name: z.string().optional(),
        value: z.string().optional(),
    })).optional(),
    is_folder: z.boolean().optional(),
    is_folder_python: z.boolean().optional(),
    is_custom: z.boolean().optional(),
    compress: z.boolean().optional(),
    use_gpu: z.boolean().optional(),
    file_path: z.string().optional(),
    folder_path: z.string().optional(),
    folder_path_python: z.string().optional(),
    python_script_path: z.string().optional(),
    scene_name: z.string().optional(),
    layer_name: z.string().optional(),
    camera_name: z.string().optional(),
    // 2 ENGINE (CYCLES, EEVEE)
    engine: z.string().optional(),
    active_frame: z.coerce.number().min(1, {
        message: 'Active frame must be greater than 0'
    }),
    frame_range: z.object({
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
    }),
    resolution: z.object({
        width: z.coerce.number().min(1, {
            message: 'Resolution width must be greater than 0'
        }),
        height: z.coerce.number().min(1, {
            message: 'Resolution height must be greater than 0'
        }),
        percentage: z.coerce.number().min(1, {
            message: 'Resolution percentage must be greater than 0'
        }),
    }),
    output: z.object({
        color: z.object({
            color_depth: z.string().optional(),
            color_mode: z.string().optional(),
        }),
        output_format: z.string().optional(),
        compression: z.coerce.number().min(1, {
            message: 'Compression must be greater than 0'
        }).max(100, {
            message: 'Compression must be less than 100'
        }),
    }),
    aspect_ratio: z.object({
        width: z.coerce.number().optional(),
        height: z.coerce.number().optional(),
    }),
    use_denoise: z.boolean().optional(),
    use_compositor: z.boolean().optional(),
    use_sequencer: z.boolean().optional(),
    use_stamp: z.boolean().optional(),
    cycles_config: z.object({
        denoise_config: z.object({
            algorithm: z.string().optional(),
            denoise_pass: z.string().optional(),
            denoise_prefilter: z.string().optional(),
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
                reflective: z.boolean().optional(),
                refractive: z.boolean().optional(),
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
        }).optional(),
        samples: z.coerce.number().min(1, {
            message: 'Samples must be greater than 0'
        }),
    }).optional(),
    // eevee_config: z.object({
    //     taa_samples: z.coerce.number().optional(),
    //     shadows: z.object({
    //         cube_size: z.string().optional(),
    //         cascade_size: z.string().optional(),
    //         high_bitdepth: z.boolean().optional(),
    //         soft_shadows: z.boolean().optional(),
    //     })
    // }).optional(),
    job_settings: z.object({
        job_definition: z.string().optional(),
        job_queue: z.string().optional(),
        number_gpus: z.string().optional(),
        array_size: z.string().optional(),
        vcpus: z.string().optional(),
        memory: z.string().optional(),
        timeout: z.string().optional(),
        job_attempts: z.string().optional(),
        // job_priority: z.string().optional(),
    }).optional(),
    ses: z.object({
        ses_email: z.string().optional(),
        enable_notifications: z.boolean().optional(),
        animation_preview: z.object({
            animation_preview_full_resolution: z.boolean().optional(),
            output_quality: z.string().optional(),
            encoding_speed: z.string().optional(),
            autosplit: z.boolean().optional(),
            ffmpeg_format: z.string().optional(),
        }).optional(),
    }).optional(),
})