
export const mockRenderData = {
    type: "frame" as const,
    is_folder: false,
    is_custom: false,
    use_gpu: false,
    project_name: "Project-test",
    compress: false,
    python_env_vars: {
        user_main_script_path: "",
        efs_blender_file_path: "",
        efs_blender_output_folder_path: "",
        blender_executable_path: "",
        use_eevee: "",
        bucket_name: "",
        bucket_key: "",
        use_gpus: ""
    },
    custom_env_vars: [],
    file_path: "C:\\Users\\admin\\Desktop\\animation-cpu-aws-test\\anim_brender.blend",
    folder_path: "",
    is_folder_python: false,
    folder_path_python: "",
    python_script_path: "",
    scene_name: "Scene",
    camera_name: "Camera",
    layer_name: "ViewLayer",
    engine: "CYCLES",
    active_frame: 25,
    frame_range: {
        start: 1,
        end: 100,
        step: 1,
        fps: 24
    },
    resolution: {
        width: 1920,
        height: 1080,
        percentage: 100
    },
    aspect_ratio: {
        width: 1,
        height: 1
    },
    use_compositor: true,
    use_sequencer: true,
    use_denoise: true,
    use_stamp: false,
    cycles_config: {
        denoise_config: {
            algorithm: "OPENIMAGEDENOISE",
            noise_threshold: 0.01,
            denoise_pass: "RGB_ALBEDO_NORMAL",
            denoise_prefilter: "ACCURATE"
        },
        light_paths: {
            caustics: {
                filter_glossy: 1,
                reflective: true,
                refractive: true
            },
            clamping: {
                direct: 1,
                indirect: 10
            },
            max_bounces: {
                total: 12,
                diffuse_bounces: 4,
                glossy_bounces: 4,
                transmission_bounces: 12,
                volume_bounces: 1,
                transparent_max_bounces: 8
            }
        },
        samples: 10
    },
    output: {
        color: {
            color_depth: "8",
            color_mode: "RGBA"
        },
        output_format: "PNG",
        compression: 15
    },
    job_settings: {
        job_definition: "JobDefinition_VERSION__4_1_1__ed9e4531-bc9f-4c0a-bd23-7ec46af06e8b",
        job_queue: "JobQueueOnDemandCPU-057612f2-5772-4957-afa2-d680624bbbe0",
        array_size: "0",
        number_gpus: "0",
        vcpus: "4",
        memory: "16000",
        timeout: "3600",
        job_attempts: "3"
    },
    ses: {
        enable_notifications: true,
        animation_preview: {
            animation_preview_full_resolution: false,
            output_quality: "HIGH",
            encoding_speed: "GOOD",
            autosplit: false,
            ffmpeg_format: "MPEG4"
        },
        ses_email: "test@gmail.com"
    }
};