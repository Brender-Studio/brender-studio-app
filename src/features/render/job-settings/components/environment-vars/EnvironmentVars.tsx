import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RenderJobSelect, { FormRenderSchemaKeys } from "../../inputs/RenderJobSelect";
import useEnvironmentVars from "@/hooks/useEnvironmentVars";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { z } from "zod";
import { formRenderSchema } from "@/schemas/formRenderSchema";

interface OptionsVars {
    name: string;
    value: string;
}[]

interface EnvironmentVarsProps {
    form: UseFormReturn<z.infer<typeof formRenderSchema>>;
}

const EnvironmentVars = ({ form }: EnvironmentVarsProps) => {
    const { environmentVars } = useEnvironmentVars(form);
    const { fields, append, remove } = useFieldArray({
        name: "custom_env_vars",
        control: form.control,
    });

    const renderJobSelectField = (fieldName: FormRenderSchemaKeys, options: OptionsVars[], defaultValue: string) => (
        <RenderJobSelect
            form={form}
            fieldName={fieldName}
            options={options}
            defaultValue={defaultValue}
        />
    );

    const addCustomEnvVar = () => {
        append({ name: "", value: "" });
    };

    const deleteCustomEnvVar = (index: number) => {
        remove(index);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {environmentVars.map((envVar, _index) => (
                        <TableRow key={envVar.name}>
                            <TableCell>
                                {envVar.name}
                            </TableCell>
                            <TableCell>
                             
                                {envVar.name === 'USE_GPU' && renderJobSelectField('python_env_vars.use_gpus' as any,
                                    [
                                        { name: 'True', value: 'True' },
                                        { name: 'False', value: 'False' }
                                    ], envVar.value)}
                                {envVar.name === 'USE_EEVEE' && renderJobSelectField('python_env_vars.use_eevee' as any, [
                                    { name: 'True', value: 'True' },
                                    { name: 'False', value: 'False' }
                                ], envVar.value)}
                                {envVar.name !== 'USE_GPU' && envVar.name !== 'USE_EEVEE' && envVar.value}
                            </TableCell>
                            <TableCell>
                                <p className="text-muted-foreground">
                                    Default
                                </p>
                            </TableCell>
                        </TableRow>
                    ))}
                    {fields.map((field, index) => (
                        <TableRow key={field.id}>
                            <TableCell>
                                <Input
                                    placeholder='Key'
                                    {...form.register(`custom_env_vars.${index}.name`)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    placeholder='Value'
                                    {...form.register(`custom_env_vars.${index}.value`)}
                                />
                            </TableCell>
                            <TableCell>
                                {/* Botón para eliminar la variable de entorno personalizada */}
                                <Button variant='destructive' className="w-full" onClick={() => deleteCustomEnvVar(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Separator className="mt-y" />
            <Button variant='secondary' type='button' onClick={addCustomEnvVar} className="mt-2">
                <Plus size={16} className="mr-2" />
                Add Custom Env
            </Button>
        </div>
    );
};

export default EnvironmentVars;
