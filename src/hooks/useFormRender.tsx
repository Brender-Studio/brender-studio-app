import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import { useFormStore } from '@/store/useFormStore';
import { formRenderSchema } from '@/schemas/formRenderSchema';
import { formRenderDefaultValues } from '@/schemas/default-values/formRenderDefaultValues';
import { setFormRenderSceneValues } from '@/lib/form-utils/setFormRenderSceneValues';

const useFormRender = () => {
    const currentPathname = useLocation().pathname;
    const { currentScene, clearAllFormStates } = useFormStore();

    const form = useForm<z.infer<typeof formRenderSchema>>({
        mode: 'onChange', 
        resolver: zodResolver(formRenderSchema),
        defaultValues: formRenderDefaultValues(currentPathname === '/render-gpu' ? true : false)
    });


    useEffect(() => {
        // reset form values when currentPathname changes
        if (currentScene && currentScene.length > 0) {
            console.log('currentScene', currentScene)
            setFormRenderSceneValues(currentScene, form);
        }
        // // print form errors
        // console.log('form errors', form.formState.errors);
        // // print form values
        // console.log('form values', form.getValues());
    }, [currentScene, form, currentPathname]);

    useEffect(() => {
        
        return () => {
            console.log('unmounting form')
            clearAllFormStates();
        };

    }, [location.pathname]);

    return { form };
};

export default useFormRender;
