// import { cyclesDefaultValues } from "./default-values/cyclesDefaultValues";
// import { eeveeDefaultValues } from "./default-values/eeveeDefaultValues";

export const setFormRenderSceneValues = (currentScene: any[], form: any) => {
    if (currentScene && currentScene.length > 0) {
        const sceneData = currentScene[0];
        const { camera, layer, engine, active_frame, resolution, aspect_ratio, output,  use_denoise, use_compositor, use_sequencer, use_stamp, cycles_config, frame_range } = sceneData;

        const setValue = (key: string, value: any) => form.setValue(key, value);

        setValue('scene_name', sceneData?.scene_name || '');
        setValue('camera_name', camera.active || '');
        setValue('layer_name', layer.active_layer || '');
        setValue('engine', engine === 'CYCLES' ? 'CYCLES' : 'BLENDER_EEVEE');
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
        setValue('aspect_ratio.width', aspect_ratio.width || 0);
        setValue('aspect_ratio.height', aspect_ratio.height || 0);
        setValue('output.color.color_depth', output.color.color_depth || 0);
        setValue('output.color.color_mode', output.color.color_mode || '');
        setValue('output.output_format', output.output_format || '');
        setValue('output.compression', output.compression || 0);
        setValue('use_denoise', use_denoise || false);
        setValue('cycles_config.samples', cycles_config.samples || 0);
        setValue('use_compositor', use_compositor || false);
        setValue('use_sequencer', use_sequencer || false);
        setValue('use_stamp', use_stamp || false);
        // setValue('eevee_config.taa_samples', eevee_config.taa_samples || 0);

        // const resetCyclesConfig = () => {
        //     setValue('cycles_config', cyclesDefaultValues);
        // };

        // const resetEeveeConfig = () => {
        //     setValue('eevee_config', eeveeDefaultValues);
        // };

        // if (engine === 'BLENDER_EEVEE') {
        //     const eeveeConfig = sceneData.eevee_config || {};

        //     setValue('eevee_config', {
        //         taa_samples: eeveeConfig.taa_samples || eeveeDefaultValues.taa_samples,
        //     });

        //     resetCyclesConfig();
        // }


        if (engine === 'CYCLES') {

            const cyclesConfig = sceneData.cycles_config || {};
            console.log('cyclesConfig', cyclesConfig);

            setValue('cycles_config', {
                denoise_config: cyclesConfig.denoise_config,
                light_paths: cyclesConfig.light_paths,
                samples: cyclesConfig.samples,
            });

            // resetEeveeConfig();
        }
    }
};
