
import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

type SesTemplates = {
    Name: string;
    CreatedTimestamp: string;
};

const { ses } = deployConfig;
const { renderCompletedTemplate, renderFailedTemplate } = ses;


export const columns: ColumnDef<SesTemplates>[] = [
    {
        id: "Name",
        header: "Template Name",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.Name}
                    {(row.original.Name === renderCompletedTemplate || row.original.Name === renderFailedTemplate) && (
                        <Badge className="ml-2">Brender Studio Template</Badge>
                    )}
                </span>
            );
        }
    },
    {
        id: "CreatedTimestamp",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.original.CreatedTimestamp);

            return (
                <span>
                    {date.toLocaleString()}
                </span>
            );
        }
    }
];
