import { Request, Response, NextFunction } from "express";
import * as rateService from "../services/rates.service";
import { success, created, notFound } from "../utils/response";

// GET all rates (with pagination + filters)
export async function getRates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filters = {
      supplierId: req.query.supplierId as string | undefined,
      currency: req.query.currency as string | undefined,
    };

    const result = await rateService.getRates(page, limit, filters);
    return res.json(success("Rates fetched successfully", result));
  } catch (err) {
    next(err);
  }
}

// GET single rate by ID
export async function getRate(req: Request, res: Response, next: NextFunction) {
  try {
    const rate = await rateService.getRateById(req.params.id);
    if (!rate) return res.status(404).json(notFound("Rate not found"));
    return res.json(success("Rate fetched successfully", rate));
  } catch (err) {
    next(err);
  }
}

// CREATE rate
export async function createRate(req: Request, res: Response, next: NextFunction) {
  try {
    const { supplierId, description, price, currency } = req.body;
    const rate = await rateService.createRate({ supplierId, description, price, currency });
    return res.status(201).json(created("Rate created successfully", rate));
  } catch (err) {
    next(err);
  }
}

// UPDATE rate
export async function updateRate(req: Request, res: Response, next: NextFunction) {
  try {
    const rate = await rateService.updateRate(req.params.id, req.body);
    return res.json(success("Rate updated successfully", rate));
  } catch (err) {
    next(err);
  }
}

// DELETE rate
export async function deleteRate(req: Request, res: Response, next: NextFunction) {
  try {
    await rateService.deleteRate(req.params.id);
    return res.json(success("Rate deleted successfully", null));
  } catch (err) {
    next(err);
  }
}
