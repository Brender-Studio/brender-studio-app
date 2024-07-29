import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formRenderSchema } from "@/schemas/formRenderSchema"
import { useFormStore } from "@/store/useFormStore"
import { UseFormReturn } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { z } from "zod"
import { Scene } from "../../project-settings/ProjectSettings.types"

type FormRenderSchema = z.infer<typeof formRenderSchema>;
type FieldName = keyof FormRenderSchema;

interface RenderSelectProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>
    fieldName: FieldName
    options: string[]
    defaultValue: string | number
    label: string
    isCustom: boolean
    setCurrentScene: (scene: Scene[]) => void
    allScenes: Scene[]
}

const RenderSelect = ({ defaultValue, fieldName, form, label, options, isCustom, setCurrentScene, allScenes }: RenderSelectProps) => {
    const { currentScene } = useFormStore()
    const currentPathname = useLocation().pathname

    const onValueChange = (value: string | number) => {
        // if fieldname is scene_name then setCurrentScene where scene_name is equal to value from allScenes
        if (fieldName === "scene_name") {
            const scene = allScenes.filter((scene) => scene.scene_name === value)
            // console.log('scene select field', scene)
            setCurrentScene(scene)
        }

        // detect if fieldName is camera_name and if "" then setformstateerror

        if(fieldName === "camera_name") {
            // console.log('camera name', value)
            if (value === "") {
                form.setError('camera_name', {
                    type: 'manual',
                    message: 'Camera name is required'
                })
            }
        }


        // if engine is selected then set engine value to form
        if (fieldName === "engine") {
            // console.log('engine select', value)
            if (value === 'BLENDER_EEVEE') {
                // console.log('eevee config here')
                // form.setValue('eevee_config', {
                //     taa_samples: currentScene[0]?.eevee_config.taa_samples || 0,
                //     shadows: {
                //         cube_size: currentScene[0]?.eevee_config.shadows.cube_size || 0,
                //         cascade_size: currentScene[0]?.eevee_config.shadows.cascade_size || 0,
                //         high_bitdepth: currentScene[0]?.eevee_config.shadows.high_bitdepth || false,
                //         soft_shadows: currentScene[0]?.eevee_config.shadows.soft_shadows || false,
                //     },
                // })
            } else if (value === 'CYCLES') {
                // console.log('cycles config here')
                form.setValue('cycles_config', {
                    denoise_config: {
                        algorithm: currentScene[0]?.cycles_config.denoise_config.algorithm || 'OPENIMAGEDENOISE',
                        denoise_pass: currentScene[0]?.cycles_config.denoise_config.denoise_pass || 'RGB_ALBEDO_NORMAL',
                        denoise_prefilter: currentScene[0]?.cycles_config.denoise_config.denoise_prefilter || 'ACCURATE',
                        noise_threshold: currentScene[0]?.cycles_config.denoise_config.noise_threshold || 0.001,
                    },
                    light_paths: {
                        caustics: {
                            filter_glossy: currentScene[0]?.cycles_config.light_paths.caustics.filter_glossy || 0,
                            reflective: currentScene[0]?.cycles_config.light_paths.caustics.reflective || false,
                            refractive: currentScene[0]?.cycles_config.light_paths.caustics.refractive || false,
                        },
                        clamping: {
                            direct: currentScene[0]?.cycles_config.light_paths.clamping.direct || 0,
                            indirect: currentScene[0]?.cycles_config.light_paths.clamping.indirect || 10,
                        },
                        max_bounces: {
                            diffuse_bounces: currentScene[0]?.cycles_config.light_paths.max_bounces.diffuse_bounces || 0,
                            glossy_bounces: currentScene[0]?.cycles_config.light_paths.max_bounces.glossy_bounces || 0,
                            total: currentScene[0]?.cycles_config.light_paths.max_bounces.total || 0,
                            transmission_bounces: currentScene[0]?.cycles_config.light_paths.max_bounces.transmission_bounces || 0,
                            transparent_max_bounces: currentScene[0]?.cycles_config.light_paths.max_bounces.transparent_max_bounces || 0,
                            volume_bounces: currentScene[0]?.cycles_config.light_paths.max_bounces.volume_bounces || 0,
                        },
                    },
                    samples: currentScene[0]?.cycles_config.samples || 0,
                })
            }
        }

        form.setValue(fieldName, value)
    }

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <Label>{label}</Label>
                    <Select
                        onValueChange={onValueChange}
                        defaultValue={defaultValue as any}
                        value={field.value as any}
                        disabled={!isCustom}
                    >
                        <FormControl>
                            <SelectTrigger className="text-xs">
                                <SelectValue placeholder={defaultValue} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option, index: number) => (
                                <SelectItem key={index} value={option}
                                    disabled={currentPathname === '/render-cpu' && option === 'OPTIX' ? true : false}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RenderSelect