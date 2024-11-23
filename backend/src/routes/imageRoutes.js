import express from "express";
import { tryCatch } from "../config/trycatch.js";
import {
  getImageInfoById,
  getImagesSearchPagination,
} from "../controllers/imageController.js";

const imageRoutes = express.Router();

imageRoutes.get(
  "/lay-danh-sach-hinh-anh-tim-kiem-phan-trang",
  tryCatch(getImagesSearchPagination)
);
imageRoutes.get("/lay-thong-tin-hinh-anh/:id", tryCatch(getImageInfoById));

export default imageRoutes;
