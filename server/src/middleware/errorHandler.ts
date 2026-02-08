import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  // zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues,
    });
  }
  
  // custom error with message
  if (err.message) {
    return res.status(err.status || 400).json({
      error: err.message,
    });
  }

  // Default error 
  res.status(500).json({ error: "Internal server error" });
}