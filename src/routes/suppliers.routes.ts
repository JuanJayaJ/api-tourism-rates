import { Router } from "express";
import * as controller from "../controllers/suppliers.controller";
import { validate } from "../utils/validate";
import { createSupplierSchema, updateSupplierSchema } from "../schemas/supplier.schema";

const router = Router();

router.get("/", controller.getSuppliers);
router.get("/:id", controller.getSupplier);
router.post("/", validate(createSupplierSchema), controller.createSupplier);
router.put("/:id", validate(updateSupplierSchema), controller.updateSupplier);
router.delete("/:id", controller.deleteSupplier);

export default router;
