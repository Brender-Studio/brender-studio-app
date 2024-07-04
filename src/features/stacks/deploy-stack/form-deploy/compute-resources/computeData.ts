
export const computeDataSection = {
  title: 'Compute Resources',
  description: 'The level of parallelism (i.e., how many tasks can run simultaneously) affects how AWS Batch will scale the number of instances (servers) needed to complete your rendering tasks.',
  infoTitle: 'Autoscaling Impact',
  infoDescription: `Low parallelism impacts autoscaling by potentially limiting the number of instances that can be parallelized. For instance, if a job is split into 10 tasks and the maximum vCpus per instance is 128, requesting 128 vCpus could trigger the creation of 1 EC2 instance.`,
  infoExample: "For example, if a job requests 128 vCPUs and the maximum vCPUs per instance is also 128, AWS Batch can start one instance to fulfill this request if no instances are already available.",
  infoExample2: "In another scenario, if a job requests 20 vCPUs and the maximum vCPUs per instance is 128, AWS Batch can start a new instance, but it will only utilize 20 out of the 128 vCPUs available on that instance. This means the instance will have unused capacity, which could impact cost-efficiency. AWS Batch will scale up the number of instances needed to fulfill the job's requirement, balancing between available capacity and job demands.",
  tooltipTitle: "Configure Compute Resources",
  tooltipDescription: "Autoscaling in AWS Batch is influenced by the maxvCpus configuration in the compute environment and the vCpus requested by a job. If a job requests more vCpus than the maxvCpus allowed per instance, AWS Batch cannot place the job on that instance. Conversely, if a job requests a number of vCpus equal to the maxvCpus of an instance, AWS Batch can place the job on that instance if available. If no instances are available, AWS Batch may start a new instance to meet the job's demand. Therefore, the maxvCpus configuration directly impacts the efficiency and cost of autoscaling.",
};



export const computeOptions = [
  {
    value: 'low',
    type: 'Low Parallelism',
    description: 'Suitable for workloads with minimal parallel processing needs.',
    maxvCpus: {
      onDemandCPUs: 32,
      spotCPUs: 32,
      onDemandGPUs: 16,
      spotGPUs: 32,
    },
  },
  {
    value: 'middle',
    type: 'Balanced Parallelism',
    description: 'Ideal for balanced workloads with moderate parallel processing needs.',
    maxvCpus: {
      onDemandCPUs: 128,
      spotCPUs: 128,
      onDemandGPUs: 32,
      spotGPUs: 64,
    },
  },
  {
    value: 'high',
    type: 'High Parallelism',
    description: 'Best for intensive workloads requiring high levels of parallel processing.',
    maxvCpus: {
      onDemandCPUs: 256,
      spotCPUs: 256,
      onDemandGPUs: 96,
      spotGPUs: 192,
    },
  },
  {
    value: 'custom',
    type: 'Customize Compute (Custom Parallelism)',
    description: 'Customize the number of vCPUs for your renderings. If you are unsure about the number of vCPUs, we recommend starting with the Balanced Parallelism option.',
    maxvCpus: {
      onDemandCPUs: 256,
      spotCPUs: 256,
      onDemandGPUs: 32,
      spotGPUs: 64,
    },
  },
];
