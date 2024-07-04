import { formRenderSchema } from "@/schemas/formRenderSchema";
import { z } from "zod";

export async function createRenderJson(values: z.infer<typeof formRenderSchema>) {

    // TODO: REVSAR SI AFECTA EL ORDEN DE cycles_config y eevee_config dentro de render_info

    let renderConfig: any = {
        render_config: {
            type: values.type,
            is_render_auto: values.is_custom ? false : true,
            use_denoise: values.use_denoise,
            engine: values.engine,
            use_gpu: values.use_gpu,
            use_compositor: values.use_compositor,
            use_sequencer: values.use_sequencer,
            use_stamp_metadata: values.use_stamp,
            active_frame: values.active_frame,
            start_frame: values.frame_range.start,
            end_frame: values.frame_range.end,
            frame_step: values.frame_range.step,
            fps: values.frame_range.fps,
            render_info: {
                scene_name: values.scene_name,
                layer_name: values.layer_name,
                camera_name: values.camera_name,
                aspect_ratio: {
                    height: values.aspect_ratio.height,
                    width: values.aspect_ratio.width
                },
                resolution: {
                    height: values.resolution.height,
                    width: values.resolution.width,
                    percentage: values.resolution.percentage
                },
                output: {
                    color: {
                        color_depth: values.output.color.color_depth,
                        color_mode: values.output.color.color_mode
                    },
                    compression: values.output.compression,
                    output_format: values.output.output_format,
                    project_name: values.project_name,
                }
            },
        }
    };

    if (values.engine === "CYCLES") {
        renderConfig.render_config.render_info.cycles_config = getCyclesConfig(values);
    } else if (values.engine === "BLENDER_EEVEE") {
        // renderConfig.render_config.render_info.eevee_config = getEeveeConfig(values);
        // REVIEW: Se comenta la línea anterior y se agrega la siguiente para que no se envíe la configuración de eevee
    }

    return renderConfig;
}

function getCyclesConfig(values: any) {
    return {
        denoise_config: {
            algorithm: values?.cycles_config?.denoise_config?.algorithm,
            denoise_pass: values?.cycles_config?.denoise_config?.denoise_pass,
            denoise_prefilter: values?.cycles_config?.denoise_config?.denoise_prefilter,
            noise_threshold: values?.cycles_config?.denoise_config?.noise_threshold
        },
        light_paths: {
            caustics: {
                filter_glossy: values?.cycles_config?.light_paths?.caustics?.filter_glossy,
                reflective: values?.cycles_config?.light_paths?.caustics?.reflective,
                refractive: values?.cycles_config?.light_paths?.caustics?.refractive
            },
            clamping: {
                indirect: values?.cycles_config?.light_paths?.clamping?.indirect,
                direct: values?.cycles_config?.light_paths?.clamping?.direct
            },
            max_bounces: {
                diffuse_bounces: values?.cycles_config?.light_paths?.max_bounces?.diffuse_bounces,
                glossy_bounces: values?.cycles_config?.light_paths?.max_bounces?.glossy_bounces,
                total: values?.cycles_config?.light_paths?.max_bounces?.total,
                transmission_bounces: values?.cycles_config?.light_paths?.max_bounces?.transmission_bounces,
                transparent_max_bounces: values?.cycles_config?.light_paths?.max_bounces?.transparent_max_bounces,
                volume_bounces: values?.cycles_config?.light_paths?.max_bounces?.volume_bounces
            }
        },
        samples: values?.cycles_config?.samples
    };
}

// function getEeveeConfig(values: any) {
//     return {
//         taa_samples: values.eevee_config.taa_samples,
//         shadows: {
//             cube_size: values.eevee_config.shadows.cube_size,
//             cascade_size: values.eevee_config.shadows.cascade_size,
//             high_bitdepth: values.eevee_config.shadows.high_bitdepth,
//             soft_shadows: values.eevee_config.shadows.soft_shadows
//         }
//     };
// }
