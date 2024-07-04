

export const predefinedScripts = [
    {
        name: 'Simple rendering job with Blender',
        job_type: 'Single job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/render_frame.py',
        description: 'This script will render the scene using Blender and save the output images.'
    },
    {
        name: 'Multicamera rendering',
        job_type: 'Single job',
        script_type: 'Utility',
        code_path: 'resources/example-scripts/multicamera_rendering.py',
        description: 'This script will iterate through all cameras in the scene and render each camera view as a separate image.'
    },
    {
        name: 'Multiscene rendering',
        job_type: 'Single job',
        script_type: 'Utility',
        code_path: 'resources/example-scripts/multiscene_rendering.py',
        description: 'This script will iterate through all scenes in the Blender file and render each scene as a separate image.'
    },
    {
        name: 'Using custom Environment Variables in AWS Batch Jobs',
        job_type: 'Single job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/custom_env_example.py',
        description: 'This script will use custom Environment Variables in the AWS Batch Job to render the scene using Blender. We set CUSTOM_RENDER_FILE_PREFIX to customize the output file names.'
    },
    {
        name: 'EEVEE or CYCLES using predefined Environment Variable',
        job_type: 'Single job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/env_engine_rendering.py',
        description: 'This script will render the scene using EEVEE or CYCLES render engine based on the Environment Variable set in the AWS Batch Job.'
    },
    {
        name: 'Render a range of frames with AWS Batch Array Jobs',
        job_type: 'Array job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/render_range_by_index.py',
        description: 'This script will render a range of frames using Array Jobs. It will render the frames based on the Array index value.'
    },
    {
        name: 'Enabling GPU rendering for EC2 instances with NVIDIA GPUs',
        job_type: 'Single job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/enable_gpu_rendering.py',
        description: 'This script will enable GPU rendering for EC2 instances configuring Blender to use the GPU for rendering. It will render the scene using the GPU and save the output images.'
    },
    {
        name: 'Using boto3 to interact with AWS S3',
        job_type: 'Single job',
        script_type: 'Example',
        code_path: 'resources/example-scripts/boto3_ops_example.py',
        description: 'This script will interact with AWS S3 & SES services using boto3 library.'
    }
]