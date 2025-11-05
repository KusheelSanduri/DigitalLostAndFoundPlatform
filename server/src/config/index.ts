// Storage configuration
// Set STORAGE_TYPE to 'memory' for local in-memory storage
// Set STORAGE_TYPE to 'mongodb' for MongoDB storage
export const STORAGE_TYPE = process.env.STORAGE_TYPE || "memory";

// MongoDB configuration (only used when STORAGE_TYPE === 'mongodb')
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/digital_lost_and_found";


// Server configuration
export const PORT = process.env.PORT || 5000;
