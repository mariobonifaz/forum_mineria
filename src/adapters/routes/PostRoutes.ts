import express from "express";
import {
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostHandler,
  getAllPostsHandler,
} from "../controllers/PostController.ts";

const router = express.Router();

router.post("/", createPostHandler);
router.put("/:id", updatePostHandler);
router.delete("/:id", deletePostHandler);
router.get("/:id", getPostHandler);
router.get("/", getAllPostsHandler);

export default router;
