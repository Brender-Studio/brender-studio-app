export type sectionType = "frame" | "animation" | "custom_render_python"
 
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