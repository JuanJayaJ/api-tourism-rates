// src/middlewares/validate.ts
import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: ZodObject, source: "body" | "query" | "params" = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);
      (req as any)[source] = parsed;
      next();
    } catch (err) {
      next(err);
    }
  };
}
