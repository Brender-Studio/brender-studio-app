
export const mapJobDefinitionName = (originalName: string) => {
    const splitName = originalName.split('__');

    // version with minor and major
    const version = splitName[1].split('_');
    
    const versionString = `${version[0]}.${version[1]}.${version[2]}`;
    return versionString;
};



// export const mapJobQueueName = (originalName: string) => {
//     // Customize this function based on your naming requirements
//     if (originalName.includes('OnDemand')) {
//         return 'Job Queue On-Demand';
//     } else if (originalName.includes('Spot')) {
//         return 'Job Queue Spot';
//     } else {
//         return originalName;
//     }
// };

export const mapJobQueueName = (originalName: string) => {
    // Customize this function based on your naming requirements
    if (originalName.includes('OnDemand')) {
        if (originalName.includes('GPUG6')) {
            return 'On-Demand GPU G6';
        } else if (originalName.includes('GPU')) {
            return 'On-Demand GPU G5';
        } else {
            return 'On-Demand CPU';
        }
    } else if (originalName.includes('Spot')) {
        if (originalName.includes('GPUG6')) {
            return 'Spot GPU G6';
        } else if (originalName.includes('GPU')) {
            return 'Spot GPU G5';
        } else {
            return 'Spot CPU';
        }
    } else {
        return originalName;
    }
};
