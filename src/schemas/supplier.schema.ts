import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  country: z.string().min(1, "Country is required"),
});

export const updateSupplierSchema = z.object({
  name: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
});
