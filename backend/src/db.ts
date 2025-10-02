import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "investment_calc";
  
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    await mongoose.connect(uri, {
      dbName: dbName,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 0,
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 10000,
    });

    isConnected = true;
    
    // Test the connection
    await mongoose.connection.db?.admin().ping();
    
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
}

export async function initDb(): Promise<void> {
  await connectToDatabase();
  
  // Create indexes
  try {
    const db = mongoose.connection.db;
    if (db) {
      await db.collection("users").createIndex({ email: 1 }, { unique: true });
      await db.collection("daily_prices").createIndex({ symbol: 1, date: 1 }, { unique: true });
    }
  } catch (error) {
    console.error("Error creating indexes:", error);
    // Don't throw here, indexes might already exist
  }
}

// Helper functions for collections
export function getUsersCollection() {
  return mongoose.connection.db?.collection("users");
}

export function getProjectsCollection() {
  return mongoose.connection.db?.collection("projects");
}

export function getDailyPricesCollection() {
  return mongoose.connection.db?.collection("daily_prices");
}

// Legacy compatibility functions
export async function openDb() {
  await connectToDatabase();
  return mongoose.connection.db;
}

export function usersCollection() {
  return getUsersCollection();
}

export function projectsCollection() {
  return getProjectsCollection();
}

export function dailyPricesCollection() {
  return getDailyPricesCollection();
}
