
export const networkingOptions = [
    {
        value: 'public',
        type: 'Public Subnets',
        description: 'Create a VPC with with public subnets.',
        pros: [
            'Direct internet connection.',
        ],
        cons: [
            'More exposure to the internet.',
        ],
        cost: "Free, no additional cost."
    },
    {
        value: 'private',
        type: 'Private Subnets',
        description: 'Create a VPC with private subnets, NAT Gateway & 2 EIPs.',
        pros: [
            'Enhanced security with private subnets.',
            // 'Reduced exposure to the internet.',
        ],
        cons: [
            'Additional cost for NAT Gateway & EIPs.',
        ],
        cost: "1 NAT Gateway ($0.045/hour) + 2 EIPs ($0.005/hour) * 24 hours/day * 30 days/month = $39.20/month (approx.)"
    },
];
