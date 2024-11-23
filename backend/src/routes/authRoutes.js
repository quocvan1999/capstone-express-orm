import express from "express";
import { login } from "../controllers/authController.js";
import { tryCatch } from "../config/trycatch.js";

const authRoutes = express.Router();

authRoutes.post("/dang-nhap", tryCatch(login));

export default authRoutes;
