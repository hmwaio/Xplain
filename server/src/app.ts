import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

/* Middleware */
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/media", postRoutes);


app.use(errorHandler);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

export default app;