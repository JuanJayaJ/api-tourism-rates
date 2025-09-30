// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

type Jsonish = Record<string, unknown>;

function zodToErrors(err: ZodError) {
  return err.issues.map((i) => ({
    path: i.path.join("."),
    message: i.message,
  }));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors: zodToErrors(err),
    });
  }

  // Prisma known errors
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        status: 409,
        message: "Conflict: duplicate value for a unique field",
        meta: err.meta,
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({
        status: 404,
        message: "Resource not found",
      });
    }
  }

// Prisma validation error (not always exported in new versions)
if (err instanceof Error && err.name === "PrismaClientValidationError") {
  return res.status(400).json({
    status: 400,
    message: "Invalid request to database",
  });
}


  // Fallback
  const msg =
    (err as Jsonish)?.message && typeof (err as Jsonish).message === "string"
      ? ((err as Jsonish).message as string)
      : "Internal Server Error";

  const status =
    (err as Jsonish)?.status && typeof (err as Jsonish).status === "number"
      ? ((err as Jsonish).status as number)
      : 500;

  res.status(status).json({
    status,
    message: msg,
  });
}
