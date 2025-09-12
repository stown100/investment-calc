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
      annualPercent REAL,
      startDate TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      investedAmount REAL NOT NULL,
      rateType TEXT NOT NULL DEFAULT 'fixed'
    );
  `);
  // Perform lightweight migrations if the schema existed before
  await migrateProjectsTable(db);
  return db;
}

async function migrateProjectsTable(dbInstance: any) {
  // Ensure rateType column exists
  const columns: Array<{ name: string; notnull: number }> =
    await dbInstance.all(`PRAGMA table_info(projects)`);
  const hasRateType = columns.some((c) => c.name === "rateType");
  if (!hasRateType) {
    await dbInstance.exec(
      `ALTER TABLE projects ADD COLUMN rateType TEXT NOT NULL DEFAULT 'fixed'`
    );
  }

  // If annualPercent is NOT NULL in existing schema, recreate table to drop NOT NULL
  const annualPercentCol = columns.find((c) => c.name === "annualPercent");
  const isAnnualPercentNotNull =
    annualPercentCol && annualPercentCol.notnull === 1;
  if (isAnnualPercentNotNull) {
    await dbInstance.exec("BEGIN TRANSACTION;");
    try {
      await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS projects_new (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          annualPercent REAL,
          startDate TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          investedAmount REAL NOT NULL,
          rateType TEXT NOT NULL DEFAULT 'fixed'
        );
      `);
      await dbInstance.exec(`
        INSERT INTO projects_new (id, name, annualPercent, startDate, createdAt, investedAmount, rateType)
        SELECT id, name, annualPercent, startDate, createdAt, investedAmount, COALESCE(rateType, 'fixed') FROM projects;
      `);
      await dbInstance.exec(`DROP TABLE projects;`);
      await dbInstance.exec(`ALTER TABLE projects_new RENAME TO projects;`);
      await dbInstance.exec("COMMIT;");
    } catch (e) {
      await dbInstance.exec("ROLLBACK;");
      throw e;
    }
  }
}
