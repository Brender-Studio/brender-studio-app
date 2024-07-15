import React from 'react';
import { useForm, UseFormReturn, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formRenderSchema } from '@/schemas/formRenderSchema';


type FormValues = z.infer<typeof formRenderSchema>;

interface TestFormComponentProps {
    defaultValues: FormValues;
    onFormReady: (form: UseFormReturn<FormValues>) => void;
}

export const TestFormComponent: React.FC<TestFormComponentProps> = ({ defaultValues, onFormReady }) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formRenderSchema),
        defaultValues,
        mode: 'all',
    });

    React.useEffect(() => {
        onFormReady(form);
    }, [form, onFormReady]);

    return <FormProvider {...form}>{null}</FormProvider>;
};
