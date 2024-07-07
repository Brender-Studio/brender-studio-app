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

export interface Sceneform {
    scene_name: string;
    layer: {
        available_layers: string[];
        active_layer: string;
    };
    camera: {
        available_cameras: string[];
        active: string;
    };
    engine: 'CYCLES' | 'BLENDER_EEVEE';
    active_frame: number;
    eevee_config?: {
        taa_samples: number;
    };
    cycles_config?: {
        samples: number;
        denoise_config: {
            noise_threshold: number;
            algorithm: 'OPENIMAGEDENOISE' | 'OPTIX';
            denoise_pass: 'RGB_ALBEDO_NORMAL' | 'ALBEDO' | 'NONE';
            denoise_prefilter: 'ACCURATE' | 'FAST' | 'NONE';
        };
        light_paths: {
            max_bounces: {
                diffuse_bounces: number;
                glossy_bounces: number;
                total: number;
                transmission_bounces: number;
                transparent_max_bounces: number;
                volume_bounces: number;
            };
            clamping: {
                direct: number;
                indirect: number;
            };
            caustics: {
                filter_glossy: number;
                reflective: boolean;
                refractive: boolean;
            };
        };
    };
    frame_range: {
        start: number;
        end: number;
        step: number;
        fps: number;
    };
    resolution: {
        width: number;
        height: number;
        resolution_percentage: number;
    };
    aspect_ratio: {
        width: number;
        height: number;
    };
    output: {
        output_format: 'BMP' | 'IRIS' | 'PNG' | 'JPEG' | 'JPEG2000' | 'TARGA' | 'TARGA_RAW' | 'CINEON' | 'DPX' | 'OPEN_EXR_MULTILAYER' | 'OPEN_EXR' | 'HDR' | 'TIFF' | 'WEBP';
        compression: number;
        color: {
            color_mode: 'BW' | 'RGB' | 'RGBA';
            color_depth: '8' | '16';
        };
    };
    use_compositor: boolean;
    use_sequencer: boolean;
    use_stamp: boolean;
    use_denoise?: boolean;
}

export interface FileDropEvent {
    event: string;
    windowLabel: string;
    payload: string[];
    id: number;
}