import RenderSelect from "../render-inputs/select/RenderSelect"
import React from "react"
import { useFormStore } from "@/store/useFormStore"
import RenderInput from "../render-inputs/input/RenderInput"
import RenderCheckbox from "../render-inputs/checkbox/RenderCheckbox"
import { sectionType } from "./RenderSettings.types"
import LabelSeparator from "@/components/custom/structure/LabelSeparator"
import { formRenderSchema } from "@/schemas/formRenderSchema"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { Sceneform } from "../project-settings/ProjectSettings.types"


interface RenderFormFieldsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
    sectionType: sectionType
}

const RenderFormFields = ({ form, sectionType }: RenderFormFieldsProps) => {

    const { currentScene, allScenes, setCurrentScene, isCustom } = useFormStore()

    const renderSelectField = (fieldName: string, label: string, options: string[], defaultValue: string | number) => (
        <RenderSelect
            form={form}
            fieldName={fieldName as any}
            label={label}
            options={options}
            defaultValue={defaultValue}
            isCustom={isCustom}
            setCurrentScene={setCurrentScene}
            allScenes={allScenes}
        />
    );

    const renderInputField = (fieldName: string, label: string, type: string, placeholder: string, defaultValue: string | number, minValue: number, maxValue?: number) => (
        <RenderInput
            form={form}
            fieldName={fieldName as any} // Review: fieldName as any (Fieldname is a string, but it should be a keyof FormRenderSchema? we pass values like frame_range.start, frame_range.end, etc.)
            label={label}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            isCustom={isCustom}
            minValue={minValue}
            maxValue={maxValue}
        />
    );

    const renderCheckboxField = (fieldName: string, label: string, defaultValue: boolean) => (
        <RenderCheckbox
            form={form}
            fieldName={fieldName as any}
            label={label}
            defaultValue={defaultValue}
            isCustom={isCustom}
        />
    );

    return (
        <div className="grid grid-cols-6 gap-2">
            {currentScene && currentScene.length > 0 ? currentScene?.map((scene: Sceneform, index: number) => {
                const sceneKey = `${index}_${scene.scene_name}`;
                return (
                    <React.Fragment key={sceneKey}>
                        <div className="grid grid-cols-3 col-span-6 gap-2">
                            <div className="grid grid-cols-3 col-span-6 gap-2">
                                {renderSelectField("scene_name", "Scene", allScenes.map((scene: Sceneform) => scene.scene_name), scene.scene_name)}
                                {renderSelectField("layer_name", "Layer", scene.layer.available_layers, scene.layer.active_layer)}
                                {renderSelectField("camera_name", "Camera", scene.camera.available_cameras, scene.camera.active)}
                                {renderSelectField("engine", "Engine", ['CYCLES', 'BLENDER_EEVEE'], scene.engine)}
                                {renderInputField("active_frame", "Active Frame", "number", "Frame", scene.active_frame, 0)}
                                {form.watch("engine") === 'CYCLES' && scene.cycles_config && renderInputField("cycles_config.samples", "Max Samples", "number", "Samples", scene.cycles_config.samples, 0)}
                            </div>
                            {sectionType === "animation" && (
                                <>
                                    <LabelSeparator label="Frame Range" colSpan={6} py={8} />
                                    <div className="grid grid-cols-4 col-span-6 gap-2">
                                        {renderInputField("frame_range.start", "Start Frame", "number", "Start Frame", scene.frame_range.start, 0)}
                                        {renderInputField("frame_range.end", "End Frame", "number", "End Frame", scene.frame_range.end, 0)}
                                        {renderInputField("frame_range.step", "Frame Step", "number", "Frame Step", scene.frame_range.step, 0)}
                                        {renderInputField("frame_range.fps", "FPS", "number", "FPS", scene.frame_range.fps, 0)}
                                    </div>
                                </>
                            )}
                            {sectionType === "custom_render_python" && (
                                <>
                                    <LabelSeparator label="Frame Range" colSpan={6} py={8} />
                                    <div className="grid grid-cols-4 col-span-6 gap-2">
                                        {renderInputField("frame_range.start", "Start Frame", "number", "Start Frame", scene.frame_range.start, 0)}
                                        {renderInputField("frame_range.end", "End Frame", "number", "End Frame", scene.frame_range.end, 0)}
                                        {renderInputField("frame_range.step", "Frame Step", "number", "Frame Step", scene.frame_range.step, 0)}
                                        {renderInputField("frame_range.fps", "FPS", "number", "FPS", scene.frame_range.fps, 0)}
                                    </div>
                                </>
                            )}
                            <LabelSeparator label="Resolution" colSpan={6} py={8} />
                            <div className="grid grid-cols-5 col-span-6 gap-2">
                                {renderInputField("resolution.width", "Width (px)", "number", "Width", scene.resolution.width, 0, 10000)}
                                {renderInputField("resolution.height", "Height (px)", "number", "Height", scene.resolution.height, 0, 10000)}
                                {renderInputField("resolution.percentage", "Resolution Scale (%)", "number", "Percentage", scene.resolution.resolution_percentage, 0)}
                                {renderInputField("aspect_ratio.width", "Aspect Width", "number", "Width", scene.aspect_ratio.width, 0, 10000)}
                                {renderInputField("aspect_ratio.height", "Aspect Height", "number", "Height", scene.aspect_ratio.height, 0, 10000)}
                            </div>
                            <LabelSeparator label="Output" colSpan={6} py={8} />
                            <div className="grid grid-cols-4 col-span-6 gap-2">
                                {renderSelectField("output.output_format", "Output Format", ['BMP', 'IRIS', 'PNG', 'JPEG', 'JPEG2000', 'TARGA', 'TARGA_RAW', 'CINEON', 'DPX', 'OPEN_EXR_MULTILAYER', 'OPEN_EXR', 'HDR', 'TIFF', 'WEBP'], scene.output.output_format)}
                                {renderInputField("output.compression", "Compression (%)", "number", "Compression", scene.output.compression, 0, 100)}
                                {renderSelectField("output.color.color_mode", "Color Mode", ['BW', 'RGB', 'RGBA'], scene.output.color.color_mode)}
                                {renderSelectField("output.color.color_depth", "Color Depth", ["8", "16"], scene.output.color.color_depth)}
                                {renderCheckboxField("use_compositor", "Use Compositor", scene.use_compositor)}
                                {renderCheckboxField("use_sequencer", "Use Sequencer", scene.use_sequencer)}
                                {renderCheckboxField("use_stamp", "Stamp Metadata", scene.use_stamp)}
                            </div>
                        </div>
                        {
                            isCustom && (
                                <>
                                    {
                                        form.watch("engine") !== 'BLENDER_EEVEE' && (
                                            <>
                                                <LabelSeparator label="Cycles Configuration" colSpan={6} py={8} />
                                                {renderCheckboxField("use_denoise", "Denoise", scene.use_denoise || false)}
                                                <div className="col-span-5"></div>
                                                {scene.cycles_config && renderInputField("cycles_config.denoise_config.noise_threshold", "Noise Treshold", "number", "Noise Treshold", scene.cycles_config.denoise_config.noise_threshold, 0.030, 1)}
                                            </>
                                        )
                                    }
                                    {form.watch("engine") === 'CYCLES' && form.watch("use_denoise") &&
                                        (
                                            <div className="grid grid-cols-3 col-span-5 gap-2">
                                                {scene.cycles_config && renderSelectField("cycles_config.denoise_config.algorithm", "Denoise Algorithm", ["OPENIMAGEDENOISE", "OPTIX"], scene.cycles_config.denoise_config.algorithm)}
                                                {scene.cycles_config && renderSelectField("cycles_config.denoise_config.denoise_pass", "Denoise Pass", ["RGB_ALBEDO_NORMAL", "ALBEDO", "NONE"], scene.cycles_config.denoise_config.denoise_pass)}
                                                {scene.cycles_config && renderSelectField("cycles_config.denoise_config.denoise_prefilter", "Denoise Prefilter", ["ACCURATE", "FAST", "NONE"], scene.cycles_config.denoise_config.denoise_prefilter)}
                                            </div>
                                        )}
                                    {form.watch("engine") === 'CYCLES' && (
                                        <>
                                            <LabelSeparator label="Light Paths" colSpan={6} py={8} />
                                            <div className="grid grid-cols-5 col-span-6 gap-2">
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.diffuse_bounces", "Diffuse Bounces", "number", "Diffuse Bounces", scene.cycles_config.light_paths.max_bounces.diffuse_bounces, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.glossy_bounces", "Glossy Bounces", "number", "Glossy Bounces", scene.cycles_config.light_paths.max_bounces.glossy_bounces, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.total", "Total Bounces", "number", "Total Bounces", scene.cycles_config.light_paths.max_bounces.total, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.transmission_bounces", "Transmission Bounces", "number", "Transmission Bounces", scene.cycles_config.light_paths.max_bounces.transmission_bounces, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.transparent_max_bounces", "Transparent Bounces", "number", "Transparent Max Bounces", scene.cycles_config.light_paths.max_bounces.transparent_max_bounces, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.max_bounces.volume_bounces", "Volume Bounces", "number", "Volume Bounces", scene.cycles_config.light_paths.max_bounces.volume_bounces, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.clamping.direct", "Direct Light", "number", "Direct Clamping", scene.cycles_config.light_paths.clamping.direct, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.clamping.indirect", "Indirect Ligth", "number", "Indirect Clamping", scene.cycles_config.light_paths.clamping.indirect, 0)}
                                                {scene.cycles_config && renderInputField("cycles_config.light_paths.caustics.filter_glossy", "Filter Glossy", "number", "Filter Glossy", scene.cycles_config.light_paths.caustics.filter_glossy, 0)}
                                                <div />
                                                {scene.cycles_config && renderCheckboxField("cycles_config.light_paths.caustics.reflective", "Reflective", scene.cycles_config.light_paths.caustics.reflective)}
                                                {scene.cycles_config && renderCheckboxField("cycles_config.light_paths.caustics.refractive", "Refractive", scene.cycles_config.light_paths.caustics.refractive)}

                                            </div>
                                        </>
                                    )}
                                </>
                            )
                        }
                    </React.Fragment>
                )
            }) : null
            }

        </div>
    )
}

export default RenderFormFields