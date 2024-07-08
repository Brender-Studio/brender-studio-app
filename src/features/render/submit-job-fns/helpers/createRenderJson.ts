import { formRenderSchema } from "@/schemas/formRenderSchema";
import { z } from "zod";

interface AspectRatio {
    height: number;
    width: number;
}

interface Resolution extends AspectRatio {
    percentage: number;
}

interface ColorOutput {
    color_depth: '8' | '16';
    color_mode: 'BW' | 'RGB' | 'RGBA';
}
// output: {
//     output_format: 'BMP' | 'IRIS' | 'PNG' | 'JPEG' | 'JPEG2000' | 'TARGA' | 'TARGA_RAW' | 'CINEON' | 'DPX' | 'OPEN_EXR_MULTILAYER' | 'OPEN_EXR' | 'HDR' | 'TIFF' | 'WEBP';
//     compression: number;
//     color: {
//         color_mode: 'BW' | 'RGB' | 'RGBA';
//         color_depth: '8' | '16';
//     };
// };

interface Output {
    color: ColorOutput;
    compression: number;
    output_format: 'BMP' | 'IRIS' | 'PNG' | 'JPEG' | 'JPEG2000' | 'TARGA' | 'TARGA_RAW' | 'CINEON' | 'DPX' | 'OPEN_EXR_MULTILAYER' | 'OPEN_EXR' | 'HDR' | 'TIFF' | 'WEBP';
    project_name: string;
}


interface RenderInfo {
    scene_name: string;
    layer_name: string;
    camera_name: string;
    aspect_ratio: AspectRatio;
    resolution: Resolution;
    output: Output;
}

// interface FrameRange {
//     start: number;
//     end: number;
//     step: number;
//     fps: number;
// }

interface DenoiseConfig {
    algorithm: string;
    denoise_pass: string;
    denoise_prefilter: string;
    noise_threshold: number;
}

interface Caustics {
    filter_glossy: number;
    reflective: boolean;
    refractive: boolean;
}

interface Clamping {
    indirect: number;
    direct: number;
}

interface MaxBounces {
    diffuse_bounces: number;
    glossy_bounces: number;
    total: number;
    transmission_bounces: number;
    transparent_max_bounces: number;
    volume_bounces: number;
}

interface LightPaths {
    caustics: Caustics;
    clamping: Clamping;
    max_bounces: MaxBounces;
}

interface CyclesConfig {
    denoise_config: DenoiseConfig;
    light_paths: LightPaths;
    samples: number;
}


interface RenderConfig {
    type: string;
    is_render_auto: boolean;
    use_denoise: boolean;
    engine: 'CYCLES' | 'BLENDER_EEVEE';
    use_gpu: boolean;
    use_compositor: boolean;
    use_sequencer: boolean;
    use_stamp_metadata: boolean;
    active_frame: number;
    start_frame: number;
    end_frame: number;
    frame_step: number;
    fps: number;
    render_info: RenderInfo & {
        cycles_config?: CyclesConfig;
        // eevee_config?: EeveeConfig; // Descomentado si se necesita en el futuro
    };
}

interface RenderJsonOutput {
    render_config: RenderConfig;
}

export async function createRenderJson(values: z.infer<typeof formRenderSchema>): Promise<RenderJsonOutput> {

    // TODO: REVSAR SI AFECTA EL ORDEN DE cycles_config y eevee_config dentro de render_info

    let renderConfig: RenderJsonOutput = {
        render_config: {
            type: values.type,
            is_render_auto: values.is_custom ? false : true,
            use_denoise: values.use_denoise ?? false,
            engine: values.engine === "CYCLES" || values.engine === "BLENDER_EEVEE" ? values.engine : "CYCLES",
            use_gpu: values.use_gpu ?? false,
            use_compositor: values.use_compositor ?? false,
            use_sequencer: values.use_sequencer ?? false,
            use_stamp_metadata: values.use_stamp ?? false,
            active_frame: values.active_frame,
            start_frame: values.frame_range.start,
            end_frame: values.frame_range.end,
            frame_step: values.frame_range.step,
            fps: values.frame_range.fps,
            render_info: {
                scene_name: values.scene_name ?? "",
                layer_name: values.layer_name ?? "",
                camera_name: values.camera_name ?? "",
                aspect_ratio: {
                    height: values.aspect_ratio.height ?? 1920,
                    width: values.aspect_ratio.width ?? 1080
                },
                resolution: {
                    height: values.resolution.height,
                    width: values.resolution.width,
                    percentage: values.resolution.percentage
                },
                output: {
                    color: {
                        color_depth: values.output.color.color_depth as '8' | '16' ?? "8",
                        color_mode: values.output.color.color_mode as 'BW' | 'RGB' | 'RGBA' ?? "RGBA"
                    },
                    compression: values.output.compression,
                    output_format: values.output.output_format as 'BMP' | 'IRIS' | 'PNG' | 'JPEG' | 'JPEG2000' | 'TARGA' | 'TARGA_RAW' | 'CINEON' | 'DPX' | 'OPEN_EXR_MULTILAYER' | 'OPEN_EXR' | 'HDR' | 'TIFF' | 'WEBP' || "PNG",
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

// function getCyclesConfig(values: any) {
//     return {
//         denoise_config: {
//             algorithm: values?.cycles_config?.denoise_config?.algorithm,
//             denoise_pass: values?.cycles_config?.denoise_config?.denoise_pass,
//             denoise_prefilter: values?.cycles_config?.denoise_config?.denoise_prefilter,
//             noise_threshold: values?.cycles_config?.denoise_config?.noise_threshold
//         },
//         light_paths: {
//             caustics: {
//                 filter_glossy: values?.cycles_config?.light_paths?.caustics?.filter_glossy,
//                 reflective: values?.cycles_config?.light_paths?.caustics?.reflective,
//                 refractive: values?.cycles_config?.light_paths?.caustics?.refractive
//             },
//             clamping: {
//                 indirect: values?.cycles_config?.light_paths?.clamping?.indirect,
//                 direct: values?.cycles_config?.light_paths?.clamping?.direct
//             },
//             max_bounces: {
//                 diffuse_bounces: values?.cycles_config?.light_paths?.max_bounces?.diffuse_bounces,
//                 glossy_bounces: values?.cycles_config?.light_paths?.max_bounces?.glossy_bounces,
//                 total: values?.cycles_config?.light_paths?.max_bounces?.total,
//                 transmission_bounces: values?.cycles_config?.light_paths?.max_bounces?.transmission_bounces,
//                 transparent_max_bounces: values?.cycles_config?.light_paths?.max_bounces?.transparent_max_bounces,
//                 volume_bounces: values?.cycles_config?.light_paths?.max_bounces?.volume_bounces
//             }
//         },
//         samples: values?.cycles_config?.samples
//     };
// }

function getCyclesConfig(values: z.infer<typeof formRenderSchema>): CyclesConfig {
    return {
        denoise_config: {
            algorithm: values.cycles_config?.denoise_config?.algorithm ?? '',
            denoise_pass: values.cycles_config?.denoise_config?.denoise_pass ?? '',
            denoise_prefilter: values.cycles_config?.denoise_config?.denoise_prefilter ?? '',
            noise_threshold: values.cycles_config?.denoise_config?.noise_threshold ?? 0
        },
        light_paths: {
            caustics: {
                filter_glossy: values.cycles_config?.light_paths?.caustics?.filter_glossy ?? 0,
                reflective: values.cycles_config?.light_paths?.caustics?.reflective ?? false,
                refractive: values.cycles_config?.light_paths?.caustics?.refractive ?? false
            },
            clamping: {
                indirect: values.cycles_config?.light_paths?.clamping?.indirect ?? 0,
                direct: values.cycles_config?.light_paths?.clamping?.direct ?? 0
            },
            max_bounces: {
                diffuse_bounces: values.cycles_config?.light_paths?.max_bounces?.diffuse_bounces ?? 0,
                glossy_bounces: values.cycles_config?.light_paths?.max_bounces?.glossy_bounces ?? 0,
                total: values.cycles_config?.light_paths?.max_bounces?.total ?? 0,
                transmission_bounces: values.cycles_config?.light_paths?.max_bounces?.transmission_bounces ?? 0,
                transparent_max_bounces: values.cycles_config?.light_paths?.max_bounces?.transparent_max_bounces ?? 0,
                volume_bounces: values.cycles_config?.light_paths?.max_bounces?.volume_bounces ?? 0
            }
        },
        samples: values.cycles_config?.samples ?? 0
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
