import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { createPost } from "../../services/posts/createPost.service.js";
import { createPostSchema } from "../../types/type.js";

const { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const create = async (req: Request, res: Response) => {
  try {
    const data = createPostSchema.parse(req.body);

    // get author_id from JWT
    const author_id = (req as any).user.user_id;

    const post = await createPost(data, author_id);
    res.status(CREATED).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create post" });
    }
  }
};
