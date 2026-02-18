import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { verifyToken } from "../../utils/jwt.js";

const { UNAUTHORIZED } = HTTP_STATUS;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(UNAUTHORIZED).json({ error: "Not authenticated" });
    }

    /* verifyToken */
    const decoded = verifyToken(token);

    if (!decoded) {
      return res
        .status(UNAUTHORIZED)
        .json({ error: "Invalid or expired token" });
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ error: "Authentication failed" });
  }
};
