import type { Request, Response } from "express";
import { uploadImage } from "../../services/uploads/cloudinary.service.js";

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "user",
      purpose: "profile-picture",
    });

    res.status(200).json({
      message: "Profile Picture uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Upload failed" });
    }
  }
};

export const uploadCoverPicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "user",
      purpose: "cover-picture",
    });

    res.status(200).json({
      message: "Cover Picture uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Upload failed" });
    }
  }
};

export const uploadPostPicture = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uplaoded" });
    }

    const result = await uploadImage(req.file, {
      app: "Blog",
      entity: "post",
      purpose: "post-picture",
    });

    res.status(200).json({
      message: "Post image uploaded successfully",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Upload failed" });
    }
  }
};
