import mongoose from "mongoose";

import { isPlaceholderValue } from "@/lib/portfolio-helpers";

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        connection: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!global.mongooseCache) {
  global.mongooseCache = {
    connection: null,
    promise: null,
  };
}

export function isMongoConfigured() {
  return Boolean(MONGODB_URI && !isPlaceholderValue(MONGODB_URI));
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!isMongoConfigured()) {
    throw new Error("MONGODB_URI is using a placeholder value.");
  }

  if (global.mongooseCache?.connection) {
    return global.mongooseCache.connection;
  }

  if (!global.mongooseCache?.promise) {
    mongoose.set("strictQuery", true);
    global.mongooseCache!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "josephco",
    });
  }

  global.mongooseCache!.connection = await global.mongooseCache!.promise;
  return global.mongooseCache!.connection;
}
