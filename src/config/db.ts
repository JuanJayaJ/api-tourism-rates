// src/config/db.ts
import { PrismaClient } from "@prisma/client";

const isDev = process.env.NODE_ENV !== "production";

const prisma = new PrismaClient({
  log: isDev ? ["query", "info", "warn", "error"] : ["warn", "error"],
});

export default prisma;
