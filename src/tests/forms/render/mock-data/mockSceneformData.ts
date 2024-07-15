import { Sceneform } from "@/features/render/project-settings/ProjectSettings.types";


export const mockSceneformData: Sceneform = {
    scene_name: "Scene",
    layer: {
        available_layers: ["Layer1", "Layer2"],
        active_layer: "Layer1"
    },
    camera: {
        available_cameras: ["Camera1", "Camera2"],
        active: "Camera1"
    },
    engine: "CYCLES",
    active_frame: 25,
    cycles_config: {
        samples: 100,
        denoise_config: {
            noise_threshold: 0.01,
            algorithm: "OPENIMAGEDENOISE",
            denoise_pass: "RGB_ALBEDO_NORMAL",
            denoise_prefilter: "ACCURATE"
        },
        light_paths: {
            max_bounces: {
                diffuse_bounces: 4,
                glossy_bounces: 4,
                total: 12,
                transmission_bounces: 12,
                transparent_max_bounces: 8,
                volume_bounces: 1
            },
            clamping: {
                direct: 1,
                indirect: 10
            },
            caustics: {
                filter_glossy: 1,
                reflective: true,
                refractive: true
            }
        }
    },
    frame_range: {
        start: 1,
        end: 100,
        step: 1,
        fps: 24
    },
    resolution: {
        width: 1920,
        height: 1080,
        resolution_percentage: 100
    },
    aspect_ratio: {
        width: 16,
        height: 9
    },
    output: {
        output_format: "PNG",
        compression: 15,
        color: {
            color_mode: "RGBA",
            color_depth: "8"
        }
    },
    use_compositor: true,
    use_sequencer: true,
    use_stamp: false,
    use_denoise: true
};
