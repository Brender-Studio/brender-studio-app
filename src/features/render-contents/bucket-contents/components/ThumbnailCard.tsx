import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import useThumbnailQuery from "@/react-query-utils/queries/s3-queries/useThumbnailQuery"
import { X } from "lucide-react"
import { useState } from "react"

interface ThumbnailCardProps {
    itemName: string
}

const ThumbnailCard = ({ itemName }: ThumbnailCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    const handleShowModal = (src: string) => {
        setImageSrc(src);
        setShowModal(true);
    }

    // console.log('ThumbnailCard:', itemName)
    const { data, isLoading } = useThumbnailQuery(itemName)


    return (
        <>
            {
                isLoading ? <Skeleton className="h-[160px] w-full" /> : (
                    <Card
                        onClick={() => handleShowModal(data || '')}
                        className="p-0 relative rounded-md cursor-pointer h-[160px]"
                    >
                        <CardHeader className="p-0 space-y-0">
                            <Badge className="absolute top-2 right-2" variant='progress'>
                                <span className="text-white">
                                    Preview
                                </span>
                            </Badge>
                            {data && <img className="rounded-lg h-[160px] object-cover" src={data} alt="Thumbnail" />}
                        </CardHeader>

                    </Card>
                )
            }
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
                    onClick={() => setShowModal(false)}
                >
                    <div className="p-4 rounded-lg max-w-3xl">
                        <img className="max-w-full max-h-[70vh] cursor-default object-contain" src={imageSrc} alt="Full size image" style={{ width: '500px' }} />
                        <Button variant="rounded" size="icon" onClick={() => setShowModal(false)} className="absolute top-10 left-[48.5%]  text-white">
                            <X size={24} />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ThumbnailCard