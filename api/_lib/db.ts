import { MongoClient, Db, Collection } from "mongodb";

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (mongoDb && mongoClient) {
    return mongoDb;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or MONGODB_DB environment variables");
  }

  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  mongoDb = mongoClient.db(dbName);

  // Ensure indexes
  try {
    await mongoDb.collection("users").createIndex({ email: 1 }, { unique: true });
    await mongoDb
      .collection("daily_prices")
      .createIndex({ symbol: 1, date: 1 }, { unique: true });
  } catch (error) {
    // Indexes might already exist, ignore error
    console.log("Index creation warning:", error);
  }

  return mongoDb;
}

export function usersCollection(): Collection {
  if (!mongoDb) throw new Error("Database not connected");
  return mongoDb.collection("users");
}

export function projectsCollection(): Collection {
  if (!mongoDb) throw new Error("Database not connected");
  return mongoDb.collection("projects");
}

export function dailyPricesCollection(): Collection {
  if (!mongoDb) throw new Error("Database not connected");
  return mongoDb.collection("daily_prices");
}
