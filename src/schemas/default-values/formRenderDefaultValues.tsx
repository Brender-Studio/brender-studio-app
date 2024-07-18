
type RenderType = 'frame' | 'animation' | 'custom_render_python';

export const formRenderDefaultValues = (use_gpu: boolean) => {
    return {
        type: 'frame' as RenderType,
        is_folder: false,
        is_custom: false,
        use_gpu: use_gpu,
        project_name: '',
        python_env_vars: {
            user_main_script_path: '',
            efs_blender_file_path: '',
            efs_blender_output_folder_path: '',
            blender_executable_path: '',
            use_eevee: '',
            bucket_name: '',
            bucket_key: '',
            use_gpus: '',
        },
        custom_env_vars: [],
        file_path: '',
        folder_path: '',
        is_folder_python: false,
        folder_path_python: '',
        python_script_path: '',
        scene_name: '',
        camera_name: '',
        layer_name: '',
        engine: '',
        active_frame: 0,
        frame_range: {
            start: 0,
            end: 0,
            step: 0,
            fps: 0,
        },
        resolution: {
            width: 0,
            height: 0,
            percentage: 0,
        },
        aspect_ratio: {
            width: 0,
            height: 0,
        },
        use_compositor: false,
        use_sequencer: false,
        use_denoise: false,
        use_stamp: false,
        cycles_config: {
            denoise_config: {
                algorithm: 'OPENIMAGEDENOISE',
                denoise_pass: 'RGB_ALBEDO_NORMAL',
                denoise_prefilter: 'ACCURATE',
                noise_threshold: 0,
            },
            light_paths: {
                caustics: {
                    filter_glossy: 0,
                    reflective: false,
                    refractive: false,
                },
                clamping: {
                    direct: 0,
                    indirect: 0,
                },
                max_bounces: {
                    diffuse_bounces: 0,
                    glossy_bounces: 0,
                    total: 0,
                    transmission_bounces: 0,
                    transparent_max_bounces: 0,
                    volume_bounces: 0,
                },
            },
            samples: 0,
        },
        // eevee_config: {
        //     taa_samples: 0,
        //     shadows: {
        //         cube_size: "0",
        //         cascade_size: "0",
        //         high_bitdepth: false,
        //         soft_shadows: false,
        //     }
        // },
        output: {
            color: {
                color_depth: '0',
                color_mode: '',
            },
            output_format: '',
            compression: 0,
        },
        job_settings: {
            job_definition: '',
            job_queue: '',
            array_size: '0',
            number_gpus: '',
            vcpus: '',
            memory: '',
            timeout: '',
            job_attempts: '',
        },
        ses: {
            enable_notifications: false,
            animation_preview: {
                animation_preview_full_resolution: false,
                output_quality: 'HIGH',
                encoding_speed: 'GOOD',
                autosplit: false,
                ffmpeg_format: 'MPEG4',
            },
        },
    };
}