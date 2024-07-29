import { generatePresignedUrl } from "@/cli-functions/s3-data/generatePresignedUrl";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { open } from "@tauri-apps/api/shell";
import { Copy } from "lucide-react";
import { useState } from "react";

interface PresignedUrlDialogProps {
    objectKey: string;
    currentPathname: string;
    currentProfile: string;
    currentAwsRegion: string;
    bucketName: string;
    state: {
        isLoading: boolean;
        openDialog: boolean;
    }
}

const PresignedUrlDialog = ({ objectKey, currentPathname, bucketName, currentAwsRegion, currentProfile }: PresignedUrlDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [expirationTime, setExpirationTime] = useState('')
    const [url, setUrl] = useState('')

    const cleanPathname = currentPathname.replace('/renders', '');

    // clean path + objectKey
    let objectPath = cleanPathname;
    if (objectKey !== '') {
        objectPath += `/${objectKey}`;
    }

    const generateUrlMutation = useMutation({
        mutationFn: async () => {
            setLoading(true);
            const generatedUrl = await generatePresignedUrl(
                {
                    bucket: bucketName,
                    key: objectPath,
                    region: currentAwsRegion,
                    profile: currentProfile,
                    expires: expirationTime
                }
            );

            return { res: generatedUrl };

        },
        onSuccess: async ({ res }) => {
            if (res) {
                setUrl(res)
                toast({
                    title: "Success",
                    description: `Successfully generated presigned url for ${objectKey}.`,
                    variant: "success",
                });
                setLoading(false);
            }
        },
        onError: async (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
            setLoading(false);
        },
    })

    const handleSubmit = () => {
        generateUrlMutation.mutate();
    }

    return (
        <div>
            <DialogHeader>
                <DialogTitle>
                    Temporary URL
                </DialogTitle>
                <DialogDescription>
                    Generate a presigned URL to download <span className="font-semibold">{objectKey}</span>. This URL is for temporary access and will expire after a set time.
                </DialogDescription>
            </DialogHeader>
            <div className="w-full pt-4 pb-8">
                <Select onValueChange={(value) => { setExpirationTime(value) }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Expiration Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Expiration Time</SelectLabel>
                            <SelectItem value="300">5 Minutes</SelectItem>
                            <SelectItem value="1200">20 minutes</SelectItem>
                            <SelectItem value="3600">1 Hour</SelectItem>
                            <SelectItem value="28800">8 Hours</SelectItem>
                            <SelectItem value="86400">24 Hours</SelectItem>
                            <SelectItem value="604800">1 Week</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {
                url && (
                    <Card className="relative w-full p-4">
                        <Button
                            variant='outline'
                            size='iconButton'
                            className="absolute top-4 right-4"
                            onClick={() => {
                                navigator.clipboard.writeText(url)
                                toast({
                                    title: "Copied",
                                    description: "URL copied to clipboard.",
                                    variant: "success",
                                });
                            }}
                        >
                            <Copy size={16} />
                        </Button>
                        <p className="font-semibold text-sm">Temporary URL:</p>
                        <p className="text-xs max-w-sm mt-2 hover:underline cursor-pointer text-blue-500"
                            style={{ wordWrap: 'break-word' }}
                            onClick={() => { open(url); }}>{url}</p>
                    </Card>
                )
            }
            <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button
                    variant='default'
                    className={loading ? 'gap-2 flex' : ''}
                    disabled={loading || !expirationTime}
                    onClick={handleSubmit}
                >
                    {loading && <SpinnerButton />}
                    {loading ? 'Generating URL' : 'Generate URL'}
                </Button>
            </DialogFooter>
        </div>
    )
}

export default PresignedUrlDialog