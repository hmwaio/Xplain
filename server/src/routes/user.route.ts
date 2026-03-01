import { Router } from "express";
import { remove } from "../controllers/account/deleteProfile.controller.js";
import { follow, unfollow } from "../controllers/account/follow.controller.js";
import { getCounts, getFollowersList, getFollowingList } from "../controllers/account/getFollow.controller.js";
import { getMyProfile } from "../controllers/account/getProfile.controller.js";
import { getProfile } from "../controllers/account/readProfile.controller.js";
import { changePasswordController, confirmEmailController, deletePicture, requestEmailController, update } from "../controllers/account/updateProfile.controller.js";
import { authenticate } from "../middleware/authentication/auth.middleware.js";

const router = Router();

/* Profile */
router.get("/users/me", authenticate, getMyProfile);
router.get("/users/:id", authenticate, getProfile);

/* Settings */
router.patch("/users/me", authenticate, update);
router.patch(
  "/users/me/account/change-password",
  authenticate,
  changePasswordController
);
router.post("/users/me/account/change-email/request", authenticate, requestEmailController);
router.post("/users/me/account/change-email/verify", authenticate, confirmEmailController);
router.delete("/users/me/picture/:type", authenticate, deletePicture);
router.delete("/users/me/account", authenticate, remove);

/* Follow-Unfollow */
router.post("/users/:userId/follow", authenticate, follow);
router.delete("/users/:userId/follow", authenticate, unfollow);
router.get("/users/:userId/followers", authenticate, getFollowersList);
router.get("/users/:userId/following", authenticate, getFollowingList);
router.get("/users/:userId/follow-counts", getCounts);

export default router;