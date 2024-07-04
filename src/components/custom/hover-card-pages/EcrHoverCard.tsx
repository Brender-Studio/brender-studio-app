import ExternalLink from "../buttons/ExternalLink"

const EcrHoverCard = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h3 className="font-semibold text-sm">What is ECR?</h3>
                <p className="text-xs text-muted-foreground">
                    Amazon ECR (Elastic Container Registry) is a service for storing Docker images. Brender Studio uses ECR to store images with different versions of Blender installed.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">What is Docker?</h3>
                <p className="text-xs text-muted-foreground">
                    Docker is a platform for developing, shipping, and running applications in containers.
                    <br />
                    <br />
                    Containers allow a developer to package up an application with all parts it needs, such as libraries and other dependencies, and ship it all out as one package.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-sm">Blender Versions</h3>
                <p className="text-xs text-muted-foreground">
                    Each image tag represents a different version of Blender. For example, a tag like <code>4.1.0</code> indicates that this image contains Blender version 4.1.0.
                    <br />
                    <br />
                    You can view the details of these images and delete them if needed.
                </p>
                <div className="w-full flex justify-end pt-4">
                    <ExternalLink
                        link='https://brenderstudio.com/docs/ui-user-guides/blender-repository-ecr'
                        title='Learn more'
                    />
                </div>
            </div>
        </div>
    )
}

export default EcrHoverCard