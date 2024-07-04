import VantageIcon from "@/components/custom/icons/VantageIcon";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { open } from "@tauri-apps/api/shell";


export type Ec2Instances = {
    id: string;
    instanceType: string;
    availabilityZone: string;
    instanceStatus: string;
    launchTime: string;
    platform: string;
    type: string;
};

export const columns: ColumnDef<Ec2Instances>[] = [
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
        id: "id",
        header: "Instance ID",
        cell: ({ row }) => {
            // construir url aws console de ec2 con el id de la instancia
            // ontener la region de aws para construir la url
            const openUrl = (id: string) => {
                const awsRegion = row.original.availabilityZone.slice(0, -1);
                const url = `https://${awsRegion}.console.aws.amazon.com/ec2/home?region=${awsRegion}#InstanceDetails:instanceId=${id}`;
                open(url);
            };

            return (
                <div
                    onClick={() => openUrl(row.original.id)}
                    className="text-blue-500 hover:underline cursor-pointer font-semibold"
                    style={{ wordBreak: "break-all"}}
                >
                    <span>
                        {row.original.id}
                    </span>
                </div>
            );
        }
    },
    {
        id: "instanceType",
        header: "Instance",
        cell: ({ row }) => row.original.instanceType,
    },
    {
        id: "type",
        header: "Type",
        cell: ({ row }) => row.original.type,
    },
    {
        id: "availabilityZone",
        header: "Availability Zone",
        cell: ({ row }) => row.original.availabilityZone,
    },
    {
        id: "instanceStatus",
        header: "Status",
        cell: ({ row }) => {
            // Show spinner if build is in progress
            if (row.original.instanceStatus === "running") {
                return (
                    <div className="flex items-center">
                        <SpinnerButton />
                        <p className="ml-2 text-green-500 font-semibold">
                            {row.original.instanceStatus.toLocaleUpperCase()}
                        </p>
                    </div>
                );
            } else if (row.original.instanceStatus === "pending") {
                return (
                    <div className="flex items-center">
                        <SpinnerButton />
                        <p className="ml-2 text-muted-foreground font-semibold">
                            {row.original.instanceStatus.toLocaleUpperCase()}
                        </p>
                    </div>
                );
            } else if (row.original.instanceStatus === "stopped") {
                return (
                    <p className="font-semibold text-muted-foreground">{row.original.instanceStatus.toLocaleUpperCase()}</p>
                );
            } else if (row.original.instanceStatus === "terminated") {
                return (
                    <p className="font-semibold text-muted-foreground">{row.original.instanceStatus.toLocaleUpperCase()}</p>
                );
            } else if (row.original.instanceStatus === "shutting-down") {
                return (
                    <div className="flex items-center">
                        <SpinnerButton />
                        <p className="ml-2 text-muted-foreground font-semibold">
                            {row.original.instanceStatus.toLocaleUpperCase()}
                        </p>
                    </div>
                );
            } else if (row.original.instanceStatus === "stopping") {
                return (
                    <div className="flex items-center">
                        <SpinnerButton />
                        <p className="ml-2 text-muted-foreground font-semibold">
                            {row.original.instanceStatus.toLocaleUpperCase()}
                        </p>
                    </div>
                );
            }

            else {
                return (
                    <p className="font-semibold text-muted-foreground">{row.original.instanceStatus}</p>
                );
            }
        },
    },
    {
        id: "launchTime",
        header: "Launch Time",
        cell: ({ row }) => {
            const date = new Date(row.original.launchTime);
            return date.toLocaleString();
        }
    },
    // platform
    {
        id: "platform",
        header: "Platform",
        cell: ({ row }) => row.original.platform,
    },
    {
        id: "pricing",
        header: "Pricing Info",
        cell: ({ row }) => {

            // we need to rediect to external web called vantage to shoy ec2 details
            // ex: https://instances.vantage.sh/aws/ec2/g5.16xlarge?region=us-east-1&os=linux&cost_duration=hourly&reserved_term=Standard.noUpfront

            const region = row.original.availabilityZone.slice(0, -1);
            console.log(region)

            const openUrl = (instanceType: string) => {
                const url = `https://instances.vantage.sh/aws/ec2/${instanceType}?region=${region}&os=linux&cost_duration=hourly&reserved_term=Standard.noUpfront`;
                open(url);
            };
            return (

                <Button
                    size="sm"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => openUrl(row.original.instanceType)}
                >
                    <VantageIcon />
                    Pricing
                </Button>
            );
        }
    }

];