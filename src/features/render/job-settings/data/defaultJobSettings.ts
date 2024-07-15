export const DEFAULT_JOB_SETTINGS = {
    GPU: {
      number_gpus: '1',
      vcpus: '2',
      memory: '12000',
      array_size: '2'
    },
    CPU: {
      number_gpus: '0',
      vcpus: '4',
      memory: '16000',
      array_size: '4'
    },
    COMMON: {
      timeout: '3600',
      job_attempts: '3'
    }
  }
  
  export const JOB_TYPES = {
    ANIMATION: 'animation',
    FRAME: 'frame',
    CUSTOM_RENDER_PYTHON: 'custom_render_python'
  }