import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ResendEmailButton from "./resend-button/ResendEmailButton";


type Ses = {
    identity: string;
    region: string;
    profile: string;
    attributes: {
        [email: string]: {
            VerificationStatus: string;
        };
    };
};

export const columns: ColumnDef<Ses>[] = [
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
    {
        id: "identity",
        header: "Identity",
        cell: ({ row }) => {

            return (
                <span>
                    {row.original.identity}
                </span>
            );
        }
    },
    {
        id: "IdentityType",
        header: "Identity Type",
        cell: () => {
            return (
                <span  >
                    Email Address
                </span>

            );
        }
    },
    {
        id: "VerificationStatus",
        header: "Verification Status",
        cell: ({ row }) => {
            const attributes = row.original.attributes;
            const email = Object.keys(attributes)[0];
            const status = attributes[email].VerificationStatus;

            const statusColor = status === "Success" ? "success" : status === "Pending" ? "secondary" : "destructive";

            return (
                <span>
                    <Badge variant={statusColor}>
                        {status}
                    </Badge>
                </span>
            );
        }
    },
    {
        id: "ResendVerificationEmail",
        header: "Resend Verification Email",
        cell: ({ row }) => {
            const attributes = row.original.attributes;
            const email = Object.keys(attributes)[0];

            return (
                <ResendEmailButton
                    profile={row.original.profile}
                    region={row.original.region}
                    identity={row.original.identity}
                    disabled={row.original.attributes[email].VerificationStatus === "Success" ? true : false}
                />
            );
        }
    }
];