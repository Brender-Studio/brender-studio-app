import React from 'react'
import { Link } from "react-router-dom";

interface RenderBreadcrumbProps {
    currentPathname: string;
    bucketName: string
}

const RenderBreadcrumb = ({ currentPathname, bucketName }: RenderBreadcrumbProps) => {
    const pathSegments = currentPathname.split('/').filter(Boolean);
    let path = '';

    return (
        <div className="flex gap-1 items-center flex-wrap mr-4">
            {pathSegments.map((segment, index) => {
                path += `/${segment}`;
                const isLastSegment = index === pathSegments.length - 1;

                return (
                    <React.Fragment key={index}>
                        <Link to={path}>
                            <p className={`font-semibold text-xs ${isLastSegment ? '' : 'text-muted-foreground'}`}>
                                {segment !== 'renders' ? segment : bucketName}
                            </p>
                        </Link>
                        {!isLastSegment && <span className='text-muted-foreground'>/</span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default RenderBreadcrumb