import express from "express";
import authRoutes from "./authRoutes.js";
import imageRoutes from "./imageRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/image", imageRoutes);

export default rootRoutes;
