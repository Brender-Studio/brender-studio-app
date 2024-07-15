export const formDeployFarmData = {
    "stackName": "TEST",
    "isPrivate": false,
    "blenderVersions": [
        "4.1.1"
    ],
    "region": "us-east-1",
    "profile": "default",
    "terms": true,
    "maxvCpus": {
        "onDemandCPU": 256,
        "spotCPU": 256,
        "onDemandGPU": 96,
        "spotGPU": 192
    },
    "spotBidPercentage": {
        "spotCPU": 80,
        "spotGPU": 90
    }
}