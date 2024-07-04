

export const deployConfig = {
    codecommit: {
        repositoryName: "brender-studio-code-commit",
        branchName: "main",
    },
    codeBuild: {
        projectName: "brender-studio-codebuild-v1",
        computeType: "BUILD_GENERAL1_SMALL",
        environment: "type=LINUX_CONTAINER,image=aws/codebuild/amazonlinux2-x86_64-standard:5.0,computeType=BUILD_GENERAL1_SMALL",
    },
    iam: {
        baseServiceRoleName: "AWSCodeBuildServiceRole",
    },
    ecr: {
        repositoryName: "blender-repo-ecr",
    },
    ses: {
        renderCompletedTemplate: "RenderCompletedTemplate",
        renderFailedTemplate: "RenderFailedTemplate",
    },
}