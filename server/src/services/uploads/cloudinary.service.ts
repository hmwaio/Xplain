import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { APPS, ENTITIES, PURPOSES, type UploaderOptions } from "../../types/type.js";


const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary environment variables are missing");
}
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  file: Express.Multer.File,
  options: UploaderOptions
) => {
  if (!APPS.includes(options.app)) throw new Error("Invalid app");
  if (!ENTITIES.includes(options.entity)) throw new Error("Invalid entity");
  if (!PURPOSES.includes(options.purpose)) throw new Error("Invalid purpose");

  const folder = `${options.app}/${options.entity}/${options.purpose}`;

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: "image",
    overwrite: true,
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    public_id: result.public_id,
    folder
  };
};

export const deleteImage = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

