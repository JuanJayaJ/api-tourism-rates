// src/validators/rate.schema.ts
import { z } from "zod";

export const rateSchema = z.object({
  supplierId: z.string().uuid(),
  description: z.string().min(5),
  price: z.number().positive(),
  currency: z.string().length(3).toUpperCase(),
});

export const rateUpdateSchema = rateSchema.partial();
