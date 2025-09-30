import { Router } from "express";
import * as controller from "../controllers/rates.controller";
import { validate } from "../utils/validate";
import { createRateSchema, updateRateSchema } from "../schemas/rate.schema";

const router = Router();

router.get("/", controller.getRates);
router.get("/:id", controller.getRate);
router.post("/", validate(createRateSchema), controller.createRate);
router.put("/:id", validate(updateRateSchema), controller.updateRate);
router.delete("/:id", controller.deleteRate);

export default router;
