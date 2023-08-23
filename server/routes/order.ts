import { Router } from "express";
import {
  getAllOrdersAmount,
  getOverBookedDates,
  makeOrder,
} from "../controllers/order";

const router = Router();

router.post("/", makeOrder);
router.get("/orderAmount", getAllOrdersAmount);
router.get("/getOverBookedDates", getOverBookedDates);

export default router;
