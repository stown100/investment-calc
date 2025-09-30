import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "investment_calc";
  
  console.log("MongoDB URI:", uri ? "URI is set" : "URI is not set");
  console.log("MongoDB DB:", dbName);
  
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    
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
    console.log("Successfully connected to MongoDB with Mongoose");
    
    // Test the connection
    await mongoose.connection.db?.admin().ping();
    console.log("MongoDB ping successful");
    
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
      console.log("Database indexes created successfully");
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
