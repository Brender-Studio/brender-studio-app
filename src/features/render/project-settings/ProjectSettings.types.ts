export type sectionType = "frame" | "animation"
 
export interface Scene {
    eevee_config?: {
        taa_samples: number;
        shadows?: {
            cube_size: string;
            cascade_size: string;
            high_bitdepth: boolean;
            soft_shadows: boolean;
        };
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
        samples: number
    };
}


export interface FileDropEvent {
    event: string;
    windowLabel: string;
    payload: string[];
    id: number;
}