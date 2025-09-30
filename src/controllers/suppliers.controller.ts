import { Request, Response, NextFunction } from "express";
import * as supplierService from "../services/suppliers.service";
import { success, created, notFound } from "../utils/response";

// ✅ GET all suppliers (with pagination)
export async function getSuppliers(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const suppliers = await supplierService.getSuppliers(page, limit);
    return res.json(success("Suppliers fetched successfully", suppliers));
  } catch (err) {
    next(err);
  }
}

// ✅ GET supplier by ID
export async function getSupplier(req: Request, res: Response, next: NextFunction) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json(notFound("Supplier not found"));
    return res.json(success("Supplier fetched successfully", supplier));
  } catch (err) {
    next(err);
  }
}

// ✅ CREATE supplier
export async function createSupplier(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, country } = req.body;
    const supplier = await supplierService.createSupplier({ name, country });
    return res.status(201).json(created("Supplier created successfully", supplier));
  } catch (err) {
    next(err);
  }
}

// ✅ UPDATE supplier
export async function updateSupplier(req: Request, res: Response, next: NextFunction) {
  try {
    const supplier = await supplierService.updateSupplier(req.params.id, req.body);
    return res.json(success("Supplier updated successfully", supplier));
  } catch (err) {
    next(err);
  }
}

// ✅ DELETE supplier
export async function deleteSupplier(req: Request, res: Response, next: NextFunction) {
  try {
    await supplierService.deleteSupplier(req.params.id);
    return res.json(success("Supplier deleted successfully", null));
  } catch (err) {
    next(err);
  }
}
