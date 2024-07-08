import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { File, Folder } from "lucide-react"
import DropdownCardObject from "../../../../components/custom/dropdowns/DropdownCardObject"
import { useNavigate } from "react-router-dom"
import { convertSize, getFileExtension } from "@/features/render-contents/bucket-contents/helpers/helpers"
import { iconMapping } from "@/features/render-contents/bucket-contents/helpers/iconMapping"
import { BucketItem } from "../RenderBucketContents"

interface ObjectCardProps {
    currentPathname: string
    bucketName: string
    item: BucketItem
}

const ObjectCard = ({ item, currentPathname, bucketName }: ObjectCardProps) => {
    const navigate = useNavigate()

    // console.log('item:', item)
    
    const handleRedirect = (item: { name: string, type: string }) => {
        console.log('ObjectCard:', item)
        console.log('currentPathname:', currentPathname)
        if (item.type === 'folder') {
            console.log('Redirecting to:', `${currentPathname}/${item.name}`)
            navigate(`${currentPathname}/${item.name}`)
        }
    }

    return (
        <>
            <Card className={item.type === 'folder' ? 'hover:bg-accent cursor-pointer relative' : 'hover:bg-accent h-[160px]  relative'}
                onClick={item.type === 'folder' ? () => handleRedirect(item) : undefined}
            >
                <CardHeader >
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center overflow-hidden truncate text-ellipsis">
                            {item.type === 'file' ? (
                                <>
                                    <div>
                                        {iconMapping[getFileExtension(item.name)] || <File size={18} />}
                                    </div>
                                    <p className="font-semibold overflow-hidden truncate text-ellipsis" title={item.name}>
                                        {item.name}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <Folder fill="currentColor" size={18} />
                                    <p className="font-semibold overflow-hidden truncate text-ellipsis">
                                        {item.name}
                                    </p>
                                </>
                            )}
                        </div>
                        <div>
                            <DropdownCardObject
                                objectKey={item.name}
                                isFolderItem={item.type === 'folder'}
                                bucketName={bucketName}
                                currentPathname={currentPathname}
                            />
                        </div>
                    </div>
                </CardHeader>
                {/* <CardContent>
                </CardContent> */}
                {item.type === 'file' && (
                    <CardFooter>
                        <span className="absolute bottom-5">
                            {item.type === 'file' && (<small className="text-muted-foreground">Size: {convertSize(item.size).toFixed(2)} MB</small>)}
                        </span>

                    </CardFooter>
                )}
            </Card>
        </>
    )
}

export default ObjectCard