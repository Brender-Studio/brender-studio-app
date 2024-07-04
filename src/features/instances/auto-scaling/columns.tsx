import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";
import ActivityDialog from "./activity/ActivityDialog";
import { useState } from "react";


export type AutoscalingGroups = {
    id: string;
    name: string;
    instances: string;
    availabilityZones: string | string[]
    createdTime: string;
    logActivity: string;
};


export const columns: ColumnDef<AutoscalingGroups>[] = [
    {
        id: "id",
        header: "Name",
        cell: ({ row }) => {
            const openUrl = (id: string) => {
                const availabilityZones = row.original.availabilityZones;
                const zonesArray = Array.isArray(availabilityZones) ? availabilityZones : availabilityZones.split(',').map((zone: string) => zone.trim());
                const awsRegion = zonesArray[0].slice(0, -1);
                console.log('awsRegion: ', awsRegion);
                const url = `https://${awsRegion}.console.aws.amazon.com/ec2/home?region=${awsRegion}#AutoScalingGroupDetails:id=${id};view=details`;
                console.log('url: ', url);
                open(url);
            };


            return (
                <div
                    onClick={() => openUrl(row.original.id)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                >
                    <span title={row.original.name} >
                        {row.original.name}
                    </span>
                </div>
            )
        },
    },
    {
        id: "instances",
        header: "Instances",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.instances}
                </span>
            )
        },
    },
    {
        id: "availabilityZones",
        header: "Availability Zones",
        cell: ({ row }) => {
            return (
                <span title={row.original.availabilityZones ? row.original.availabilityZones.toString() : ''}>
                    {row.original.availabilityZones}
                </span>
            )
        },
    },
    {
        id: "createdTime",
        header: "Created Time",
        cell: ({ row }) => {
            const date = new Date(row.original.createdTime);
            return date.toLocaleString();
        },
    },
    {
        id: "logActivity",
        header: "Log Activity",
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <ActivityDialog
                    title="Activity Logs"
                    description="View the activity logs of the Auto Scaling Group"
                    autoScalingGroupName={row.original.name}
                    openDialog={isOpen} 
                    setOpenDialog={setIsOpen}
                />
            )
        },
    },
];