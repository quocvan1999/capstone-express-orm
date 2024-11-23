import express from "express";
import { tryCatch } from "../config/trycatch.js";
import { getImagesSearchPagination } from "../controllers/imageController.js";

const imageRoutes = express.Router();

imageRoutes.get(
  "/lay-danh-sach-hinh-anh-tim-kiem-phan-trang",
  tryCatch(getImagesSearchPagination)
);

export default imageRoutes;
