import { Router } from "express";
import { add as addComment, getAll as getAllComments, remove as removeComment } from "../controllers/posts/comment.controller.js";
import { create } from "../controllers/posts/createPost.controller.js";
import { remove } from "../controllers/posts/deletePost.controller.js";
import { getAll, getOne } from "../controllers/posts/getPosts.controller.js";
import { like, unlike } from "../controllers/posts/like.controller.js";
import { getMySaved, save, unsave } from "../controllers/posts/save.controller.js";
import { update } from "../controllers/posts/updatePost.controller.js";
import { uploadCoverPicture, uploadPostPicture, uploadProfilePicture } from "../controllers/uploads/upload.controller.js";
import { authenticate } from "../middleware/authentication/auth.middleware.js";
import { upload } from "../middleware/upload/upload.middleware.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema } from "../types/type.js";

const router = Router();

/* Media upload */
router.post("/upload/profile-picture", authenticate, upload.single('image'), uploadProfilePicture);
router.post("/upload/cover-picture", authenticate, upload.single('image'), uploadCoverPicture);
router.post("/upload/post-picture", authenticate, upload.single('image'), uploadPostPicture);

/* Posts */
router.post("/new-post", authenticate, validate(createPostSchema), create);
router.patch("/post/:id/edit", authenticate, update);
router.delete("/post/:id/delete", authenticate, remove);
router.get("/post/:id", authenticate, getOne);      // Public
router.get("/posts", authenticate, getAll);          // Public

/* Comments */
router.post("/post/:postId/comment", authenticate, addComment);
router.delete("/post/comment/:id", authenticate, removeComment);
router.get("/post/:postId/comments", authenticate, getAllComments);

/* Likes */
router.post("/post/:postId/like", authenticate, like);
router.delete("/post/:postId/like", authenticate, unlike);

/* Save posts */
router.post("/post/:postId/save", authenticate, save);
router.delete("/post/:postId/save", authenticate, unsave);
router.get("/saved-posts", authenticate, getMySaved);

export default router;