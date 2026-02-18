import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCodes.constant.js";
import { uploadImage } from "../../services/uploads/cloudinary.service.js";

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS;

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(BAD_REQUEST).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "user",
      purpose: "profile-picture",
    });

    res.status(OK).json({
      message: "Profile Picture uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Upload failed" });
    }
  }
};

export const uploadCoverPicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(BAD_REQUEST).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "user",
      purpose: "cover-picture",
    });

    res.status(OK).json({
      message: "Cover Picture uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Upload failed" });
    }
  }
};

export const uploadPostPicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(BAD_REQUEST).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "post",
      purpose: "post-picture",
    });

    res.status(OK).json({
      message: "Post image uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(INTERNAL_SERVER_ERROR).json({ error: "Upload failed" });
    }
  }
};
