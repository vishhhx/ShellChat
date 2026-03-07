import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import type { MySql2Database } from "drizzle-orm/mysql2";

let db: MySql2Database | null = null;
let connecting: Promise<MySql2Database> | null = null;

export async function getDb(): Promise<MySql2Database> {
  if (db) return db;
  if (connecting) return connecting;

  connecting = (async () => {
    console.log(process.env.DATABASE_URL);
    try {
      const pool = mysql.createPool({
        uri:
          process.env.DATABASE_URL ||
          "mysql://vishwa:vish2004@127.0.0.1:3307/cli_chat",
        connectionLimit: 10,
      });

      db = drizzle(pool);

      return db;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}
