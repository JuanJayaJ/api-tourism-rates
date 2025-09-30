import { z } from "zod";

export const createRateSchema = z.object({
  supplierId: z.string().uuid("Supplier ID must be a valid UUID"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  currency: z.string().length(3, "Currency must be a 3-letter code"),
});

export const updateRateSchema = z.object({
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
});
