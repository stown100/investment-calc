import { MongoClient, Db, Collection } from "mongodb";

export let mongoClient: MongoClient;
export let mongoDb: Db;

export async function openDb(): Promise<Db> {
  if (mongoDb) return mongoDb;
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "investment_calc";
  
  console.log("MongoDB URI:", uri ? "URI is set" : "URI is not set");
  console.log("MongoDB DB:", dbName);
  
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  
  try {
    mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 0,
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 10000,
      tls: true,
      tlsInsecure: false,
      directConnection: false,
      retryWrites: true,
      retryReads: true,
    });
    
    console.log("Attempting to connect to MongoDB...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB");
    
    mongoDb = mongoClient.db(dbName);
    
    // Test the connection
    await mongoDb.admin().ping();
    console.log("MongoDB ping successful");
    
    return mongoDb;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    if (mongoClient) {
      await mongoClient.close();
    }
    throw error;
  }
}

export async function initDb(): Promise<Db> {
  const db = await openDb();
  // Ensure indexes
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db
    .collection("daily_prices")
    .createIndex({ symbol: 1, date: 1 }, { unique: true });
  return db;
}

export function usersCollection(): Collection {
  return mongoDb.collection("users");
}

export function projectsCollection(): Collection {
  return mongoDb.collection("projects");
}

export function dailyPricesCollection(): Collection {
  return mongoDb.collection("daily_prices");
}
