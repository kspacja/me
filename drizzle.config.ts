import type { Config } from "drizzle-kit";

import dotenv from 'dotenv'; 
dotenv.config({ path: '.env.local' }); 

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export default {
  schema: "./lib/db/schema",
  dialect: "postgresql",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
} satisfies Config;