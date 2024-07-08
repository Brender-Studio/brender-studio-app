import { useEffect, useRef, useState } from "react";
import ObjectCard from "@/features/render-contents/bucket-contents/components/ObjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import RenderBreadcrumb from "@/components/navigation/RenderBreadcrumb";
import RefreshQueryS3Btn from "./components/RefreshQueryS3Btn";
import { useUserSessionStore } from "@/store/useSessionStore";
import RedirectAwsButton from "@/components/custom/buttons/RedirectAwsButton";
import useBucketStackQueries from "@/react-query-utils/queries/s3-queries/useBucketStackQueries";
import ThumbnailCard from "./components/ThumbnailCard";
import EmptyBucketDialog from "./components/EmptyBucketDialog";
import PlayblastCard from "./components/PlayblastCard";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export interface S3Resource {
    ResourceType: string;
    LogicalResourceId: string;
    PhysicalResourceId: string;
    Timestamp: string;
}

export interface BucketItem {
    name: string
    type: string
    lastModified: string | null
    size: number
}

const RenderBucketContents = () => {
    const { getSessionData } = useUserSessionStore();
    const { currentAwsRegion, currentProfile, currentStack } = getSessionData();
    const currentPathname = useLocation().pathname;
    const [isSticky, setIsSticky] = useState(false);

    const { bucketName, bucketQuery } = useBucketStackQueries();

    const sentinelRef = useRef<HTMLDivElement>(null);

    const generateSkeletons = (count: number) => {
        return Array.from({ length: count }, (_, index) => <Skeleton className="h-[160px] w-full" key={index} />);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { root: null, threshold: 0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    const handleScrollToTop = () => {
        sentinelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    const folders = bucketQuery.data?.filter((item): item is BucketItem => item !== null && item.type === 'folder') || [];
    const files = bucketQuery.data?.filter((item): item is BucketItem => item !== null && item.type !== 'folder') || [];


    return (
        <div>
            {/* Sentinel div to observe */}
            <div ref={sentinelRef}></div>
            {
                isSticky &&
                <Button size='icon' variant='secondary' className="rounded-full absolute bottom-8 right-5 z-20" onClick={handleScrollToTop}>
                    <ChevronUp size={24} />
                </Button>
            }
            <div className={`transition-all duration-300 py-4 flex justify-between items-center ${isSticky ? 'p-0 m-0 pt-16 sticky -top-5 z-[9] transition-all duration-300 translate-y-4 bg-background' : ''}`}>
                <div className="flex gap-2 items-center">
                    {bucketName ? (
                        <div className="font-semibold text-xs">
                            <RenderBreadcrumb currentPathname={currentPathname} bucketName={bucketName} />
                        </div>
                    ) : (
                        <Skeleton className="h-8 w-96 rounded-sm" />
                    )}
                </div>
                <div className="flex gap-2 items-center">
                    <RefreshQueryS3Btn />
                    <RedirectAwsButton
                        linkAwsConsole={bucketName ? `https://${currentAwsRegion}.console.aws.amazon.com/s3/buckets/${bucketName}/?region=${currentAwsRegion}&bucketType=general&tab=objects` : ''}
                    />
                    <EmptyBucketDialog bucketName={bucketName} currentAwsRegion={currentAwsRegion} currentProfile={currentProfile!} currentStack={currentStack!} />
                </div>
            </div>

            <div className="space-y-4">
                {!bucketName || bucketQuery.isLoading ? (
                    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-2">
                        <Skeleton className="h-8 w-32 col-span-4" />
                        {generateSkeletons(8)}
                    </div>
                ) : (
                    bucketQuery.data && bucketQuery.data.length > 0 ? (
                        <>
                            {folders.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">
                                        Folders
                                    </h3>
                                    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-2">
                                        {folders.map((folder: BucketItem, index: number) => (
                                            <ObjectCard
                                                key={index}
                                                item={folder}
                                                currentPathname={currentPathname}
                                                bucketName={bucketName}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">
                                        Files
                                    </h3>
                                    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-2">
                                        {bucketQuery.data?.find((item): item is BucketItem => item !== null && item.name.startsWith('bs_full_resolution')) && (
                                            <ObjectCard
                                                item={bucketQuery.data.find((item): item is BucketItem => item !== null && item.name.startsWith('bs_full_resolution'))!}
                                                currentPathname={currentPathname}
                                                bucketName={bucketName}
                                            />
                                        )}
                                        {bucketQuery.data?.find((item): item is BucketItem => item !== null && item.name.startsWith('bs_playblast')) && (
                                            <PlayblastCard />
                                        )}
                                        {bucketQuery.data?.find((item): item is BucketItem => item !== null && item.name === 'bs_thumbnail.png') && (
                                            <ThumbnailCard
                                                itemName={bucketQuery.data.find((item): item is BucketItem => item !== null && item.name === 'bs_thumbnail.png') ? 'bs_thumbnail.png' : ''}
                                            />
                                        )}
                                        {files.
                                            filter((file: BucketItem) => file.name !== 'bs_thumbnail.png')
                                            .filter((file: BucketItem) => !file.name.startsWith('bs_playblast'))
                                            .filter((file: BucketItem) => !file.name.startsWith('bs_full_resolution'))
                                            .map((file: BucketItem, index: number) => (
                                                <ObjectCard
                                                    key={index}
                                                    item={file}
                                                    currentPathname={currentPathname}
                                                    bucketName={bucketName}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )}

                        </>
                    ) : (
                        <div className="h-[80vh] flex justify-center col-span-4 items-center">
                            <p className="text-muted-foreground text-xs">
                                No objects found in this bucket.
                            </p>
                        </div>
                    )
                )}
            </div >
        </div >
    );
};

export default RenderBucketContents;
