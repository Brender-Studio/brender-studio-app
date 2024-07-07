export type sectionType = "frame" | "animation" | "custom_render_python"
 
export interface Scene {
    active_frame: number;
    aspect_ratio: {
        width: number;
        height: number;
    };
    blender_version_file: string;
    camera: {
        active: string;
        available_cameras: string[];
    };
    cycles_config?: {
        denoise_config: {
            algorithm: string;
            denoise_pass: string;
            denoise_prefilter: string;
            noise_threshold: number;
        };
        light_paths: {
            caustics: {
                filter_glossy: number;
                reflective: boolean;
                refractive: boolean;
            };
            clamping: {
                direct: number;
                indirect: number;
            };
            max_bounces: {
                diffuse_bounces: number;
                glossy_bounces: number;
                total: number;
                transmission_bounces: number;
                transparent_max_bounces: number;
                volume_bounces: number;
            };
        };
        samples: number;
    };
    eevee_config?: {
        taa_samples: number;
        shadows?: {
            cube_size: string;
            cascade_size: string;
            high_bitdepth: boolean;
            soft_shadows: boolean;
        };
    };
    engine: "BLENDER_EEVEE" | "CYCLES" | string;
    frame_range: {
        start: number;
        end: number;
        step: number;
        fps: number;
        custom: string;
    };
    is_active: boolean;
    layer: {
        active_layer: string;
        available_layers: string[];
    };
    node_outputs: any[]; 
    output: {
        color: {
            [key: string]: any;
        };
        output_format: string;
        compression: number;
    };
    resolution: {
        width: number;
        height: number;
        resolution_percentage: number;
    };
    scene_name: string;
    use_compositor: boolean;
    use_denoise: boolean;
    use_sequencer: boolean;
    use_stamp: boolean;
}


export interface FileDropEvent {
    event: string;
    windowLabel: string;
    payload: string[];
    id: number;
}