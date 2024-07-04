export const S3_UPLOAD_CONFIGS = {
    "100MB": {
      maxConcurrentRequests: 100,
      multipartChunksize: "8MB",
      maxBandwidth: "100MB/s",
      multipartThreshold: "50MB",
      maxQueueSize: 1000
    },
    "200MB": {
      maxConcurrentRequests: 200,
      multipartChunksize: "16MB",
      maxBandwidth: "200MB/s",
      multipartThreshold: "100MB",
      maxQueueSize: 1500
    },
    "500MB": {
      maxConcurrentRequests: 400,
      multipartChunksize: "24MB",
      maxBandwidth: "300MB/s",
      multipartThreshold: "250MB",
      maxQueueSize: 2500
    },
    "1GB": {
      maxConcurrentRequests: 500,
      multipartChunksize: "28MB",
      maxBandwidth: "400MB/s",
      multipartThreshold: "400MB",
      maxQueueSize: 3000
    },
    "2GB": {
      maxConcurrentRequests: 600,
      multipartChunksize: "32MB",
      maxBandwidth: "500MB/s",
      multipartThreshold: "500MB",
      maxQueueSize: 3500
    },
    "5GB": {
      maxConcurrentRequests: 700,
      multipartChunksize: "40MB",
      maxBandwidth: "600MB/s",
      multipartThreshold: "750MB",
      maxQueueSize: 4000
    },
    "10GB": {
      maxConcurrentRequests: 800,
      multipartChunksize: "48MB",
      maxBandwidth: "700MB/s",
      multipartThreshold: "1GB",
      maxQueueSize: 4500
    }
  };