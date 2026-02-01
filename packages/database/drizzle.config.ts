import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL! ||
      "mysql://vishwa:vish2004@localhost:3307/cli_chat",
  },
});
