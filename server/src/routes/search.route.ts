import { Router } from "express";
import { posts, users } from "../controllers/search/search.controller.js";

const router = Router();

router.get("/search/posts", posts);
router.get("/search/users", users);

export default router;
