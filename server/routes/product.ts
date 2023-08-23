import upload from "../middleware/uploadImage";
import {
  addProduct,
  getAllProducts,
  searchProduct,
  updateProduct,
} from "../controllers/product";

import { Router } from "express";

const router = Router();

router.post("/", upload.single("imagePath"), addProduct);
router.put("/:id", upload.single("imagePath"), updateProduct);
router.get("/searchProduct", searchProduct);
router.get("/", getAllProducts);

export default router;
