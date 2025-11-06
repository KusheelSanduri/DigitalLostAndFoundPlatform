import { IStorageService } from "./storage.interface";
import { MemoryStorageService } from "./memoryStorage";
import { MongoDBStorageService } from "./mongodbStorage";
import { STORAGE_TYPE } from "../config";

let storageServiceInstance: IStorageService | null = null;

/**
 * Factory function to get the appropriate storage service
 * Based on STORAGE_TYPE config
 */
export function getStorageService(): IStorageService {
  if (storageServiceInstance) {
    return storageServiceInstance;
  }

  if (STORAGE_TYPE === "mongodb") {
    storageServiceInstance = new MongoDBStorageService();
    console.log("📦 Using MongoDB storage");
  } else {
    storageServiceInstance = new MemoryStorageService();
    console.log("💾 Using in-memory storage (data will be lost on restart)");
  }

  return storageServiceInstance;
}
