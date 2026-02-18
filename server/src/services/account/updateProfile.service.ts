import { prisma } from "../../lib/prisma.js";

export const updateProfile = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
    profile_picture?: string;
    profile_picture_id?: string;
    cover_picture?: string;
    cover_picture_id?: string;
  },
) => {
  // Update user info
  const updateUserData: any = {};
  if (data.name) updateUserData.name = data.name;
  if (data.email) updateUserData.email = data.email;

  if (Object.keys(updateUserData).length > 0) {
    await prisma.user.update({
      where: { user_id: userId },
      data: updateUserData,
    });
  }

  // Update profile pictures
  const updateProfileData: any = {};
  if (data.profile_picture !== undefined) {
    updateProfileData.profile_picture = data.profile_picture;
    updateProfileData.profile_picture_id = data.profile_picture_id;
  }
  if (data.cover_picture !== undefined) {
    updateProfileData.cover_picture = data.cover_picture;
    updateProfileData.cover_picture_id = data.cover_picture_id;
  }

  if (Object.keys(updateProfileData).length > 0) {
    await prisma.profile.update({
      where: { user_id: userId },
      data: updateProfileData,
    });
  }

  return { message: "Profile updated successfully" };
};

/* delete profile picture */
export const deleteProfilePicture = async (
  userId: number,
  type: "profile" | "cover",
) => {
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const publicId =
    type === "profile" ? profile.profile_picture_id : profile.cover_picture_id;

  if (publicId) {
    const { deleteImage } = await import("../uploads/cloudinary.service.js");
    await deleteImage(publicId);
  }

  await prisma.profile.update({
    where: { user_id: userId },
    data:
      type === "profile"
        ? { profile_picture: null, profile_picture_id: null }
        : { cover_picture: null, cover_picture_id: null },
  });
  return { message: `${type} picture deleted successfully` };
};
