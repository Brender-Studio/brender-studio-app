import { z } from "zod";
import * as zodValidations from "./validationFormRenderSchema";


export const formRenderSchema = z.object({
    type: z.enum(['frame', 'animation', 'custom_render_python']),
    project_name: zodValidations.ProjectName,
    python_env_vars: zodValidations.PythonEnvVars,
    custom_env_vars: zodValidations.CustomEnvVars,
    is_folder: z.boolean(),
    is_folder_python: z.boolean(),
    is_custom: z.boolean(),
    compress: z.boolean(),
    use_gpu: z.boolean(),
    file_path: z.string(),
    folder_path: z.string(),
    folder_path_python: z.string(),
    python_script_path: z.string(),
    scene_name: z.string(),
    layer_name: z.string(),
    camera_name: z.string(),
    engine: z.string(),
    active_frame: z.coerce.number().min(1, {
        message: 'Active frame must be greater than 0'
    }),
    frame_range: zodValidations.FrameRange,
    resolution: zodValidations.Resolution,
    output: zodValidations.Output,
    aspect_ratio: zodValidations.AspectRatio,
    use_denoise: z.boolean(),
    use_compositor: z.boolean(),
    use_sequencer: z.boolean(),
    use_stamp: z.boolean(),
    cycles_config: zodValidations.CyclesConfig,
    // eevee_config: EveeConfig.optional(),
    job_settings: zodValidations.JobSettings,
    ses: zodValidations.Ses.optional(),
})