// src/app.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import supplierRoutes from "./routes/suppliers.routes";
import rateRoutes from "./routes/rates.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/healthz", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/rates", rateRoutes);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// Error handler
app.use(errorHandler);

export default app;
