import { describe, expect, it, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { UseFormReturn } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from 'react-router-dom';
import { formRenderSchema } from '@/schemas/formRenderSchema';
import { setFormRenderSceneValues } from '@/lib/form-utils/setFormRenderSceneValues';
import { mockSceneformData } from './mock-data/mockSceneformData';
import { z } from 'zod';
import { TestFormComponent } from './TestComponent';

type FormValues = z.infer<typeof formRenderSchema>;

const queryClient = new QueryClient();

describe("setFormRenderSceneValues function - This test verifies that values are correctly set when a .blend file is read and default values are applied to the form.", () => {
    let formInstance: UseFormReturn<FormValues>;

    beforeEach(() => {
        formInstance = {} as UseFormReturn<FormValues>;
    });

    const renderTestForm = (defaultValues: FormValues) => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TestFormComponent 
                        defaultValues={defaultValues} 
                        onFormReady={(form) => { formInstance = form; }} 
                    />
                </MemoryRouter>
            </QueryClientProvider>
        );
    };

    it("should set form values based on the current scene and no extra values", async () => {
        renderTestForm({} as FormValues);

        await act(async () => {
            setFormRenderSceneValues([mockSceneformData], formInstance);
        });

        const getValues = formInstance.getValues;
        console.log('getValues', getValues());

        const expectedValues = {
            scene_name: mockSceneformData.scene_name,
            camera_name: mockSceneformData.camera.active,
            layer_name: mockSceneformData.layer.active_layer,
            engine: mockSceneformData.engine,
            active_frame: mockSceneformData.active_frame,
            frame_range: {
                start: mockSceneformData.frame_range.start,
                end: mockSceneformData.frame_range.end,
                step: mockSceneformData.frame_range.step,
                fps: mockSceneformData.frame_range.fps,
            },
            resolution: {
                width: mockSceneformData.resolution.width,
                height: mockSceneformData.resolution.height,
                percentage: mockSceneformData.resolution.resolution_percentage,
            },
            aspect_ratio: {
                width: mockSceneformData.aspect_ratio.width,
                height: mockSceneformData.aspect_ratio.height,
            },
            output: {
                color: {
                    color_depth: mockSceneformData.output.color.color_depth,
                    color_mode: mockSceneformData.output.color.color_mode,
                },
                output_format: mockSceneformData.output.output_format,
                compression: mockSceneformData.output.compression,
            },
            use_denoise: mockSceneformData.use_denoise,
            cycles_config: mockSceneformData?.cycles_config,
            use_compositor: mockSceneformData.use_compositor,
            use_sequencer: mockSceneformData.use_sequencer,
            use_stamp: mockSceneformData.use_stamp,
        };

        expect(getValues()).toEqual(expectedValues);

        if (mockSceneformData.engine === 'CYCLES') {
            expect(getValues('cycles_config')).toEqual(mockSceneformData.cycles_config);
        }
    });
});
