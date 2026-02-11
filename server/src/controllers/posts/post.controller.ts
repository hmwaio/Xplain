import type { Request, Response } from "express";
import { createPostSchema } from "../../types/type.js";
import { createPost } from "../../services/posts/post.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createPostSchema.parse(req.body);

    // get author_id from JWT
    const author_id = (req as any).user.user_id;

    const post = await createPost(data, author_id);
    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to create post" });
    }
  }
}