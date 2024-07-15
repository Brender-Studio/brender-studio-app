import ConfirmRenderDialog from "@/features/render/render-forms/confirm-render/ConfirmRenderDialog";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen, waitFor, act } from "@testing-library/react";
import { useForm, UseFormReturn } from "react-hook-form";
import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockRenderData } from "./mock-data/formRenderData";

type FormValues = z.infer<typeof formRenderSchema>;

const queryClient = new QueryClient()

const TestComponent = ({ initialValues = mockRenderData, onFormReady }: { initialValues?: FormValues, onFormReady?: (form: UseFormReturn<FormValues>) => void }) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formRenderSchema),
        defaultValues: initialValues,
        mode: 'all'  // This will make the form validate on change
    });

    // Call onFormReady with the form instance
    if (onFormReady) {
        onFormReady(form);
    }

    return <ConfirmRenderDialog
        openDialog={true}
        setOpenDialog={() => { }}
        form={form}
        title="Review & Submit"
        description="Please review the following details before submitting the job."
    />;
};

describe("Confirm Render Dialog - Test dialog before submit render job", () => {
    let formInstance: UseFormReturn<FormValues>;

    beforeEach(() => {
        formInstance = {} as UseFormReturn<FormValues>;
    });

    const renderTestComponent = (initialValues?: FormValues) => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TestComponent initialValues={initialValues} onFormReady={(form) => { formInstance = form; }} />
                </MemoryRouter>
            </QueryClientProvider>
        );
    };

    it("should validate mockRenderData against the schema", () => {
        const result = formRenderSchema.safeParse(mockRenderData);
        // console.log(result)
        // console log exact field that is not valid
        // console.log(result?.error?.errors);
        expect(result.success).toBe(true);
        if (!result.success) {
            console.error(result.error);
        }
    });

    it("should render the dialog", () => {
        renderTestComponent();
        const h2 = screen.getByRole('heading', { name: /Review & Submit/i, level: 2 });
        expect(h2).toBeInTheDocument();
    });

    it("should render the project name", async () => {
        renderTestComponent();
        const projectName = screen.getByText(/Project Name/i);
        expect(projectName).toBeInTheDocument();

        await act(async () => {
            const value = formInstance.getValues('project_name');
            expect(value).toBe(mockRenderData.project_name);
        });
    });

    it("should have an enabled 'Submit Job' button when form is valid", async () => {
        renderTestComponent();
        await waitFor(() => {
            expect(Object.keys(formInstance.formState.errors).length).toBe(0);
        });
        const button = screen.getByRole('button', { name: /Submit Job/i });
        expect(button).toBeEnabled();
    });

    it("should have a disabled 'Submit Job' button when form has errors", async () => {
        renderTestComponent();

        await act(async () => {
            // set an empty project name to force an error
            formInstance.setValue('project_name', '', { shouldValidate: true });
        });

        await waitFor(() => {
            expect(Object.keys(formInstance.formState.errors).length).toBeGreaterThan(0);
        }, { timeout: 5000 });

        const button = screen.getByRole('button', { name: /Submit Job/i });
        expect(button).toBeDisabled();
    });
});
