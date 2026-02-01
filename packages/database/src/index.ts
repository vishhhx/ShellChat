import { drizzle } from "drizzle-orm/mysql2";
import type { MySql2Database } from "drizzle-orm/mysql2";

declare global {
  var db: MySql2Database | undefined;
}

export const db =
  globalThis.db ??
  drizzle({
    connection: Bun.env.DATABASE_URL!,
  });

if (Bun.env.NODE_ENV !== "production") {
  globalThis.db = db;
}
