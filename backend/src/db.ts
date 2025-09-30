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
  
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  mongoDb = mongoClient.db(dbName);
  return mongoDb;
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
