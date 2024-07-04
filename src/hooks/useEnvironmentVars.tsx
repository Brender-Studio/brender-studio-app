// src/hooks/useEnvironmentVars.ts
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import useBucketNameQuery from "@/react-query-utils/queries/s3-queries/useBucketNameQuery";
import { efsBlenderFilePath, efsMainScriptPath } from '@/lib/utils/efsPaths';
import { UseFormReturn } from 'react-hook-form';


const useEnvironmentVars = (form: UseFormReturn<any>) => {
    const currentPathname = useLocation().pathname;
    const { bucketName } = useBucketNameQuery();

    const environmentVars = [
        { name: 'JOB_ACTION_TYPE', value: form.watch('type') },
        { name: 'EFS_MAIN_SCRIPT_PATH', value: efsMainScriptPath(form.getValues()) },
        { name: 'EFS_BLENDER_FILE_PATH', value: efsBlenderFilePath(form.getValues()) },
        { name: 'EFS_BLENDER_OUTPUT_FOLDER_PATH', value: `/mnt/efs/projects/${form.watch('project_name')}/output` },
        { name: 'BLENDER_EXECUTABLE', value: '/usr/bin/blender' },
        { name: 'USE_EEVEE', value: form.watch('engine') === 'BLENDER_EEVEE' ? 'True' : 'False' },
        { name: 'USE_GPU', value: currentPathname === '/render-gpu' ? 'True' : 'False' },
        { name: 'BUCKET_NAME', value: bucketName ? bucketName : '' },
        { name: 'BUCKET_KEY', value: form.watch('project_name') },
    ];

    useEffect(() => {
        form.setValue('python_env_vars', {
            user_main_script_path: form.watch('python_script_path'),
            efs_blender_file_path: form.watch('file_path'),
            efs_blender_output_folder_path: `/mnt/efs/projects/${form.watch('project_name')}/output`,
            blender_executable_path: '/usr/bin/blender',
            use_eevee: form.watch('engine') === 'BLENDER_EEVEE' ? 'True' : 'False',
            bucket_name: bucketName ? bucketName : '',
            bucket_key: form.watch('project_name'),
            use_gpus: currentPathname === '/render-gpu' ? 'True' : 'False'
        });
    }, [form.watch('python_script_path'), form.watch('file_path'), form.watch('project_name'), form.watch('engine'), form, bucketName, currentPathname]);

    return { environmentVars };
};

export default useEnvironmentVars;
