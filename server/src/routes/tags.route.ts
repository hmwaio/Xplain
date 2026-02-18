import { Router } from "express";
import { autocomplete, getAll, getOne, getPopular } from "../controllers/aap/tags.controller.js";

const router = Router();

router.get("/tags", getAll);
router.get("/tags/populer", getPopular);
router.get("/tags/autocomplete", autocomplete);
router.get("/tags/:id", getOne);

export default router;