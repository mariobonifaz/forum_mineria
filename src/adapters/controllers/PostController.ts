import { Request, Response } from "express";
import { PostService } from "../../aplication/PostService.ts";
import { MongoPostRepository } from "../percistency/MongoPostRepository.ts";

const postRepo = new MongoPostRepository();
const postService = new PostService(postRepo);

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const post = req.body;
    const newPost = await postService.createPost(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const updatePostHandler = async (req: Request, res: Response) => {
  const updatedPost = await postService.updatePost(req.params.id, req.body);
  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found." });
  }
  res.json(updatedPost);
};

export const deletePostHandler = async (req: Request, res: Response) => {
  const success = await postService.deletePost(req.params.id);
  if (!success) {
    return res.status(404).json({ message: "Post not found." });
  }
  res.status(204).send();
};

export const getPostHandler = async (req: Request, res: Response) => {
  const post = await postService.getPost(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  res.json(post);
};

export const getAllPostsHandler = async (_req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.json(posts);
};
