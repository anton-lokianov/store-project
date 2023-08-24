import { Router } from "express";
import {
  getAllOrdersAmount,
  getOverBookedDates,
  getTheLastOrderByUserId,
  makeOrder,
} from "../controllers/order";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, makeOrder);
router.get("/orderAmount", getAllOrdersAmount);
router.get("/getOverBookedDates", verifyToken, getOverBookedDates);
router.get("/lastOrder/:userId", getTheLastOrderByUserId);

export default router;
