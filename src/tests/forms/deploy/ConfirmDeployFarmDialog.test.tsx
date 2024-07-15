import { deployStackSchema } from "@/schemas/deployStackSchema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formDeployFarmData } from "./mock-data/formDeployFarmData";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDeployDialog from "@/features/stacks/deploy-stack/form-deploy/confirm-deploy-dialog/ConfirmDeployDialog";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";

type FormValues = z.infer<typeof deployStackSchema>;

const queryClient = new QueryClient()


const TestComponent = ({ initialValues = formDeployFarmData, onFormReady }: { initialValues?: FormValues, onFormReady?: (form: UseFormReturn<FormValues>) => void }) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(deployStackSchema),
        defaultValues: initialValues,
        mode: 'all'  // This will make the form validate on change
    });

    // Call onFormReady with the form instance
    if (onFormReady) {
        onFormReady(form);
    }

    return <ConfirmDeployDialog
        openDialog={true}
        setOpenDialog={() => { }}
        form={form}
        title="Review & Deploy"
        description="Please review the information before deploying the stack."
    />;
};


describe("Confirm Deploy Farm Dialog - Test dialog before deploying new farm", () => {
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

    it("should validate formDeployFarmData against the schema", () => {
        const result = deployStackSchema.safeParse(formDeployFarmData);
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
        const h2 = screen.getByRole('heading', { name: /Review & Deploy/i, level: 2 });
        expect(h2).toBeInTheDocument();
    });

    it("should render the stack name", async () => {
        renderTestComponent();
        const projectName = screen.getByText(/TEST/i);
        expect(projectName).toBeInTheDocument();

        await act(async () => {
            const value = formInstance.getValues('stackName');
            expect(value).toBe(formDeployFarmData.stackName);
        });
    });

    it("should have an enabled 'Deploy Farm' button when form is valid", async () => {
        renderTestComponent();
        await waitFor(() => {
            expect(Object.keys(formInstance.formState.errors).length).toBe(0);
        });
        const button = screen.getByRole('button', { name: /Deploy Farm/i });
        expect(button).toBeEnabled();
    });

    it("should have a disabled 'Deploy Farm' button when form has errors", async () => {
        renderTestComponent();

        await act(async () => {
            formInstance.setValue('stackName', '', { shouldValidate: true });
        });

        await waitFor(() => {
            expect(Object.keys(formInstance.formState.errors).length).toBeGreaterThan(0);
        }, { timeout: 5000 });

        const button = screen.getByRole('button', { name: /Deploy Farm/i });
        expect(button).toBeDisabled();
    });


});
