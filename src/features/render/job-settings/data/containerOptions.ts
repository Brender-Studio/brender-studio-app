export const cpuContainerOptions = [
    {
        name: 'Basic',
        vcpus: '2', // Extraído de m4.large
        memory: '8000', // Redondeado
    },
    {
        name: 'Standard',
        vcpus: '4', // Extraído de m4.xlarge
        memory: '16000', // Redondeado
    },
    {
        name: 'Advanced',
        vcpus: '8', // Extraído de m4.2xlarge
        memory: '32000', // Redondeado
    },
    {
        name: 'Powerful',
        vcpus: '16', // Extraído de m4.4xlarge
        memory: '64000', // Redondeado
    },
    {
        name: 'Intense',
        vcpus: '40', // Extraído de m4.10xlarge
        memory: '160000', // Redondeado
    },
    {
        name: 'High Performance',
        vcpus: '64', // Extraído de m4.16xlarge
        memory: '256000', // Redondeado
    },
    {
        name: 'Extreme',
        vcpus: '72', // Extraído de c5.18xlarge
        memory: '144000', // Redondeado
    },
    {
        name: 'Ultra Fast',
        vcpus: '96', // Extraído de c5.24xlarge
        memory: '192000', // Redondeado
    },
];


export const gpuContainerOptions = [
    {
        name: 'Basic',
        vcpus: '2',
        memory: '12000',
        gpus: '1',
    },
    {
        name: 'Standard',
        vcpus: '8',
        memory: '32000',
        gpus: '1',
    },
    {
        name: 'Advanced',
        vcpus: '16',
        memory: '64000',
        gpus: '1',
    },
    {
        name: 'Powerful',
        vcpus: '32',
        memory: '128000',
        gpus: '1',
    },
    {
        name: 'Intense',
        vcpus: '48',
        memory: '192000',
        gpus: '4',
    },
    {
        name: 'High Performance',
        vcpus: '64',
        memory: '256000',
        gpus: '1',
    },
    {
        name: 'Ultra Fast',
        vcpus: '96',
        memory: '384000',
        gpus: '4',
    },
    {
        name: 'Extreme',
        vcpus: '192',
        memory: '768000',
        gpus: '8',
    },
];
