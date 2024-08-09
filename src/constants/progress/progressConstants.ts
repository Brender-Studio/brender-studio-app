export const PROGRESS_STEPS = {
    CHECKING_SES_TEMPLATES: 'Checking SES Templates',
    CREATING_SES_TEMPLATE: 'Creating SES Template',
    CHECKING_CODE_BUILD_ROLE: 'Checking Code Build Role',
    CREATING_CODE_BUILD_ROLE: 'Creating Code Build Role',
    // CHECKING_CODE_COMMIT: 'Checking Code Commit',
    // CREATING_CODE_COMMIT: 'Creating Code Commit',
    CHECKING_S3_CODEBUILD: 'Checking S3 Code Build',
    CREATING_S3_CODEBUILD: 'Creating S3 Code Build',
    UPLOADING_BUILDSPEC_YML: 'Uploading Buildspec.yml',
    CHECKING_CODE_BUILD: 'Checking Code Build',
    CREATING_CODE_BUILD: 'Creating Code Build',
    STARTING_CODE_BUILD: 'Starting Code Build',
};

export const PROGRESS_STEPS_RENDER = {
    PREPARING_FILES: 'Preparing Files',
    UPLOADING_FILES: 'Uploading Files to S3',
    SUBMITING_JOB_1: 'Submitting first job, Copy S3 files to EFS',
    SUBMITING_JOB_2: 'Submitting second job, Render Blender file',
    SUBMITING_JOB_3: 'Submitting third job, Copy rendered files to S3',
};
