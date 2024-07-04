import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type EcrImage = {
    repositoryName: string;
    imageDigest: string;
    imagePushedAt: string;
    imageSizeInBytes: number;
    imageTags: string[];
};

export const columns: ColumnDef<EcrImage>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    // {
    //     id: "repositoryName",
    //     header: "Repository",
    //     cell: ({ row }) => row.original.repositoryName,
    // },
    {
        id: "imageTags",
        header: "Tag",
        cell: ({ row }) => row.original.imageTags
    },
    {
        id: "imageDigest",
        header: "Image Digest",
        cell: ({ row }) => {

            return (
                <div>
                    <p >{row.original.imageDigest}</p>
                </div>
            )
        }
    },
    {
        id: "imagePushedAt",
        accessorKey: "imagePushedAt",
        header: "Pushed At",
        cell: ({ row }) => {
            const date = new Date(row.getValue('imagePushedAt'))
            const formated = date.toLocaleString()
            return <p>{formated}</p>
        }
    },
    {
        id: "imageSizeInBytes",
        header: "Size",
        cell: ({ row }) => {
            const size = row.original.imageSizeInBytes
            const sizeInMb = size / 1000000
            return <p>{sizeInMb.toFixed(2)} MB</p>
        }
    },
];
