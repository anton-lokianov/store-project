import express from "express";
import { checkIfEmailAndIdExist, login, register } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkIfEmailAndIdExist/:email/:idNumber", checkIfEmailAndIdExist);

export default router;
