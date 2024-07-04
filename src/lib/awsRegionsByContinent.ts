export const awsRegionsByContinent = {
    "North America": ["us-east-1", "us-east-2", "us-west-2", "ca-central-1"],
    "Europe": ["eu-central-1", "eu-west-1", "eu-west-2", "eu-north-1"],
    "Asia": ["ap-south-1", "ap-northeast-1", "ap-northeast-2", "ap-southeast-2"],
    "South America": ["sa-east-1"]
};

export const awsRegionsByContinentGpu = {
    "North America": [
        { region: "us-east-1", g5: true, g6: true },
        { region: "us-east-2", g5: true, g6: true },
        { region: "us-west-2", g5: true, g6: true },
        { region: "ca-central-1", g5: true, g6: false }
    ],
    "Europe": [
        { region: "eu-central-1", g5: true, g6: false },
        { region: "eu-west-1", g5: true, g6: false },
        { region: "eu-west-2", g5: true, g6: false },
        { region: "eu-north-1", g5: true, g6: false }
    ],
    "Asia": [
        { region: "ap-south-1", g5: true, g6: false },
        { region: "ap-northeast-1", g5: true, g6: false },
        { region: "ap-northeast-2", g5: true, g6: false },
        { region: "ap-southeast-2", g5: true, g6: false },
        // { region: "ap-southeast-3", g5: true, g6: false }
    ],
    "South America": [
        { region: "sa-east-1", g5: true, g6: false }
    ]
};
