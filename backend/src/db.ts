import sqlite3 from "sqlite3";
import { open } from "sqlite";

export let db: any;

export async function openDb() {
  return open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
}

export async function initDb() {
  db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      annualPercent REAL NOT NULL,
      startDate TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      investedAmount REAL NOT NULL
    );
  `);
  return db;
}
