import "dotenv/config";

const { defineConfig } = require("drizzle-kit");
export default defineConfig({
  out: "./drizzle",
  schema: "./src/drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
