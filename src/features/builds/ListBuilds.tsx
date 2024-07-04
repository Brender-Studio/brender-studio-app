import { DataTableBuild } from './DataTableBuild'
import { columns } from './columns'
import { deployConfig } from '@/cli-functions/deploy/deploy-config/deployConfig'
import { useUserSessionStore } from '@/store/useSessionStore'
import useGetCodebuildQueries from '@/react-query-utils/queries/codebuild-queries/useGetCodebuildQueries'


const ListBuilds = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile } = getSessionData();

    const codeBuildRepoName = deployConfig.codeBuild.projectName

    const awsConsoleLinkCodeBuild = `https://${currentAwsRegion}.console.aws.amazon.com/codesuite/codebuild/projects/${codeBuildRepoName}/history?region=${currentAwsRegion}`

    const { codeBuildProjectsQuery, codeBuildStatusQuery } = useGetCodebuildQueries();

    return (
        <div className='py-6'>
            <DataTableBuild
                isQueryLoading={codeBuildStatusQuery.isLoading || codeBuildProjectsQuery.isLoading}
                columns={columns}
                data={codeBuildStatusQuery.data || []}
                awsRegion={currentAwsRegion!}
                awsProfile={currentProfile!}
                linkAwsConsole={awsConsoleLinkCodeBuild}
            />
        </div>
    );
}

export default ListBuilds;
