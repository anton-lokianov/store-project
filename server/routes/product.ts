import upload from "../middleware/uploadImage";
import {
  addProduct,
  getAllProducts,
  searchProduct,
  updateProduct,
} from "../controllers/product";

import { Router } from "express";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, upload.single("imagePath"), addProduct);
router.put("/:id", verifyToken, upload.single("imagePath"), updateProduct);
router.get("/searchProduct", verifyToken, searchProduct);
router.get("/", getAllProducts);

export default router;
