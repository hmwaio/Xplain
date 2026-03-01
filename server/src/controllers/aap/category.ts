import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { CATEGORIES } from "../../types/category.types.js";
import { errorResponse, successResponse } from "../../utils/response.js";

const { OK, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    return successResponse(res, { CATEGORIES }, "Tags fetch successfully", OK);
  } catch (error) {
    return errorResponse(
      res,
      error instanceof Error ? error.message : "Failed to fetch tags",
      INTERNAL_SERVER_ERROR,
    );
  }
};
