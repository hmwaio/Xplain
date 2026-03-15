import { Router } from "express";
import { autocomplete, getAll, getOne, getPopular } from "../controllers/aap/tags.controller.js";
import { getAllCategories } from "../controllers/aap/category.js";
import { authenticate } from "../middleware/authentication/auth.middleware.js";

const router = Router();

router.get("/tags", getAll);
router.get("/tags/populer", getPopular);
router.get("/tags/autocomplete", autocomplete);
router.get("/tags/:id", getOne);
router.get("/categories", authenticate, getAllCategories);

export default router;