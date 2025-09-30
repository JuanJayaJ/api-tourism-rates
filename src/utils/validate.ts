// src/utils/validate.ts
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

type Location = "body" | "query" | "params";

export function validate(schema: ZodTypeAny, at: Location = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[at]);
      // Replace with parsed (coerced) values
      (req as any)[at] = parsed;
      next();
    } catch (err) {
      next(err);
    }
  };
}
