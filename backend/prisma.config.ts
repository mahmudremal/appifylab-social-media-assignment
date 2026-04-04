import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";

// Ensure the path is absolute for the CLI to work correctly on Render/Linux
const dbPath = path.resolve(process.cwd(), "database.db");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Override the URL to ensure it uses the absolute path
    url: `file:${dbPath}`,
  },
});
