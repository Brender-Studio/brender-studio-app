import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import { useFormStore } from '@/store/useFormStore';
import { formRenderSchema } from '@/schemas/formRenderSchema';
import { formRenderDefaultValues } from '@/schemas/default-values/formRenderDefaultValues';
import { setFormRenderSceneValues } from '@/lib/form-utils/setFormRenderSceneValues';

type FormValues = z.infer<typeof formRenderSchema>;

const useFormRender = () => {
    const currentPathname = useLocation().pathname;
    const { currentScene, clearAllFormStates } = useFormStore();

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: zodResolver(formRenderSchema),
        defaultValues: formRenderDefaultValues(currentPathname === '/render-gpu' ? true : false)
    });


    const getSceneValue = (path: string) => 
        currentScene && currentScene.length > 0 ? path.split('.').reduce((o, k) => o && o[k], currentScene[0]) : null;

    const validations = {
        camera_name: {
            getValue: () => getSceneValue('camera.active'),
            validate: (value: string) => !value,
            errorMessage: 'Camera name is required'
        },
        layer_name: {
            getValue: () => getSceneValue('layer.active_layer'),
            validate: (value: string) => !value,
            errorMessage: 'Layer name is required'
        },
        engine: {
            getValue: () => getSceneValue('engine'),
            validate: (value: string) => value === 'BLENDER_WORKBENCH',
            errorMessage: 'Engine must be either CYCLES or BLENDER_EEVEE'
        },
        scene_name: {
            getValue: () => getSceneValue('scene_name'),
            validate: (value: string) => !value,
            errorMessage: 'Scene name is required'
        }
    };



    useEffect(() => {
        if (currentScene && currentScene.length > 0) {
            // console.log('currentScene', currentScene)
            setFormRenderSceneValues(currentScene, form);

            Object.entries(validations).forEach(([field, { getValue, validate, errorMessage }]) => {
                const value = getValue();
                if (validate(value)) {
                    form.setError(field as keyof FormValues, { type: 'manual', message: errorMessage });
                } else {
                    form.clearErrors(field as keyof FormValues);
                }
            });
        }
    }, [currentScene, form, currentPathname]);

    useEffect(() => {
        return () => {
            // console.log('unmounting form')
            clearAllFormStates();
            form.clearErrors()
        };
    }, [location.pathname]);

    return { form };
};

export default useFormRender;