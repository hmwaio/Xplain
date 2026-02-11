import { Router } from "express";
import { uploadCoverPicture, uploadPostPicture, uploadProfilePicture } from "../controllers/posts/upload.controller.js";
import { upload } from "../middleware/upload/upload.middleware.js";
import { authenticate } from "../middleware/authentication/auth.middleware.js";
import { create } from "../controllers/posts/post.controller.js";

const router = Router();

/* Media upload */
router.post("/upload/profile-picture", authenticate, upload.single('image'), uploadProfilePicture);
router.post("/upload/cover-picture", authenticate, upload.single('image'), uploadCoverPicture);
router.post("/upload/post-picture", authenticate, upload.single('image'), uploadPostPicture);

/* Posts */
router.post("/new-post", authenticate, create);

export default router;