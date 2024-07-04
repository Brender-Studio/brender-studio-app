import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePlayblastQuery from "@/react-query-utils/queries/s3-queries/usePlayblastQuery";
import { PlayIcon, X } from "lucide-react";
import { useState } from "react";

const PlayblastCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');

    const handleShowModal = (src: string) => {
        setVideoSrc(src);
        setShowModal(true);
    }

    const { data, isLoading } = usePlayblastQuery()

    return (
        <>
            {
                isLoading ? <Skeleton className="h-[160px] w-full" /> : (
                    <Card
                        onClick={() => handleShowModal(data || '')}
                        className="p-0 relative rounded-md cursor-pointer h-[160px]"
                    >
                        <CardHeader className="p-0 space-y-0">
                            <Badge className="absolute top-2 right-2" variant='secondary'>
                                <span className="text-white">
                                    Playblast
                                </span>
                            </Badge>
                            <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-60 rounded-full" >
                                <PlayIcon size={24} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white " />
                            </div>
                            {data && <video className="rounded-lg h-[160px] object-cover" autoPlay loop src={data} />}
                        </CardHeader>

                    </Card>
                )
            }
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
                    onClick={() => setShowModal(false)}
                >
                    <div className="p-4 rounded-lg max-w-3xl">
                        <video
                            className="max-w-full max-h-[70vh] cursor-default"
                            src={videoSrc}
                            controls
                            style={{ width: '720px' }}
                            autoPlay
                            loop
                        />
                        <Button variant="rounded" size="icon" onClick={() => setShowModal(false)} className="absolute top-10 left-[48.5%] text-white">
                            <X size={24} />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlayblastCard