import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import {
  searchPosts,
  searchUsers,
} from "../../services/search/search.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

/* GET /api/search/posts */
export const posts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    if (isNaN(page)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid page" });
    }
    if (isNaN(limit)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid limit" });
    }
    const filters = {
      query: req.query.q as string,
      category: req.query.category as string,
      tag: req.query.tag as string,
      author: req.query.author as string,
    };
    const result = await searchPosts(filters, page, limit);
    res.status(OK).json(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Search failed" });
  }
};

/* GET /api/search/users */
export const users = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    if (isNaN(page)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid page" });
    }
    if (isNaN(limit)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid limit" });
    }

    if (!query || query.length < 2) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Query must be at least 2 characters" });
    }

    const result = await searchUsers(query, page, limit);
    res.status(OK).json(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Search failed" });
  }
};
