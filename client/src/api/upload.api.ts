import apiClient from "./client.api";

export const uploadAPI = {
  // Upload profile picture
  uploadProfilePicture: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post("/media/upload/profile-picture", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  // Upload cover picture
  uploadCoverPicture: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post("/media/upload/cover-picture", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  // Upload post image
  uploadPostImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post("/media/upload/post-image", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
};