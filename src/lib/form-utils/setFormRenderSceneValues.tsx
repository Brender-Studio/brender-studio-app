import { Sceneform } from "@/features/render/project-settings/ProjectSettings.types";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const setFormRenderSceneValues = (currentScene: Sceneform[], form: UseFormReturn<z.infer<typeof formRenderSchema>>) => {
    if (currentScene && currentScene.length > 0) {
        const sceneData = currentScene[0];
        const { camera, layer, engine, active_frame, resolution, aspect_ratio, output, use_denoise, use_compositor, use_sequencer, use_stamp, cycles_config, frame_range } = sceneData;

        const setValue = (key: string, value: any) => form.setValue(key as any, value);

        setValue('scene_name', sceneData?.scene_name || '');
        setValue('camera_name', camera.active || '');
        setValue('layer_name', layer.active_layer || '');
        setValue('engine', engine === 'BLENDER_EEVEE_NEXT' ? 'BLENDER_EEVEE' : engine);
        // setValue('engine', engine === 'CYCLES' ? 'CYCLES' : 'BLENDER_EEVEE');
        setValue('active_frame', active_frame || 0);
        // frame range
        setValue('frame_range.start', frame_range.start || 0);
        setValue('frame_range.end', frame_range.end || 0);
        setValue('frame_range.step', frame_range.step || 0);
        setValue('frame_range.fps', frame_range.fps || 0);
        // --
        setValue('resolution.width', resolution.width || 0);
        setValue('resolution.height', resolution.height || 0);
        setValue('resolution.percentage', resolution.resolution_percentage || 0);
        // setValue('compress', false);
        setValue('aspect_ratio.width', aspect_ratio.width || 0);
        setValue('aspect_ratio.height', aspect_ratio.height || 0);
        setValue('output.color.color_depth', output.color.color_depth || 0);
        setValue('output.color.color_mode', output.color.color_mode || '');
        setValue('output.output_format', output.output_format || '');
        setValue('output.compression', output.compression || 0);
        setValue('use_denoise', use_denoise || false);
        setValue('cycles_config.samples', cycles_config?.samples || 0);
        setValue('use_compositor', use_compositor || false);
        setValue('use_sequencer', use_sequencer || false);
        setValue('use_stamp', use_stamp || false);


        if (engine === 'CYCLES') {

            const cyclesConfig: { denoise_config?: any, light_paths?: any, samples?: any } = sceneData.cycles_config || {};
            // console.log('cyclesConfig', cyclesConfig);

            setValue('cycles_config', {
                denoise_config: cyclesConfig.denoise_config,
                light_paths: cyclesConfig.light_paths,
                samples: cyclesConfig.samples,
            });

        }
    }
};
