import { Scene } from "../ProjectSettings.types";

export const addPlaceholderIfNotExists = (scene: Scene): Scene => {

    // Check if the scene has cycles_config object, if not, add a placeholder
    if (!scene.cycles_config) {
        scene.cycles_config = {
            denoise_config: {
                algorithm: 'OPENIMAGEDENOISE',
                denoise_pass: 'RGB_ALBEDO_NORMAL',
                denoise_prefilter: 'ACCURATE',
                noise_threshold: 0.001,
            },
            light_paths: {
                caustics: {
                    filter_glossy: 1.0,
                    reflective: false,
                    refractive: false,
                },
                clamping: {
                    direct: 0,
                    indirect: 10,
                },
                max_bounces: {
                    diffuse_bounces: 4,
                    glossy_bounces: 4,
                    total: 12,
                    transmission_bounces: 12,
                    transparent_max_bounces: 8,
                    volume_bounces: 0,
                },
            },
            samples: 1024,
        };
    }

    return scene;
};