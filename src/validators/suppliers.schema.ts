// src/validators/supplier.schema.ts
import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
});

export const supplierUpdateSchema = supplierSchema.partial();
