import { Router } from "express";
import {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} from "./post.controller";
import { imageUpload } from "../../middleware/imageUpload";
export const router = Router();

router
  .route("/")
  .get(getAllPosts)
  .post(imageUpload.single("image"), createPost)
  .put(imageUpload.single("image"), updatePost)
  .delete(deletePost);
