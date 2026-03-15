import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../api/post.api";
import { uploadAPI } from "../../api/upload.api";
import TextEditor from "../../components/editor/TextEditor";
import Spinner from "../../components/ui/Spinner";
import { useCategories } from "../../hooks/useCategories";

type CreatePostForm = {
  title: string;
  content: string;
  post_picture: string;
  post_picture_id?: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  imageFile?: File;
};

export default function CreatePost() {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();

  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    content: "",
    post_picture: "",
    category: "",
    tags: [],
    status: "draft",
  });

  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (form.tags.length >= 5) {
      alert("Maximum 5 tags allowed");
      return;
    }

    const tag = tagInput.trim().toLowerCase();
    if (!form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!form.content.trim()) {
      alert("Content is required");
      return;
    }

    if (form.tags.length < 3) {
      alert("Minimum 3 tags required");
      return;
    }

    if (form.tags.length > 5) {
      alert("Maximum 5 tags allowed");
      return;
    }

    setSubmitting(true);

    try {
      let post_picture = null;
      let post_picture_id = null;
      if (form.imageFile) {
        const uploadRes = await uploadAPI.uploadPostImage(form.imageFile);
        post_picture = uploadRes.data.url;
        post_picture_id = uploadRes.data.public_id;
      }

      const postData = {
        title: form.title,
        content: form.content,
        category: form.category,
        tags: form.tags,
        status: form.status,
        post_picture: post_picture || null,
        post_picture_id: post_picture_id || null,
      };

      const response = await postAPI.createPost(postData);
      alert(form.status === "draft" ? "Draft saved!" : "Post published!");
      navigate(`/me`);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  if (categoriesLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

          {/* Editor */}
          <TextEditor form={form} setForm={setForm} />

          {/* Category */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Tags <span className="text-red-500">*</span> (3-5 tags)
            </label>

            <div className="flex gap-2 mb-3 flex-wrap">
              {form.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Type tag and press Enter"
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                maxLength={20}
              />
              <button
                onClick={addTag}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {form.tags.length}/5 tags •{" "}
              {3 - form.tags.length > 0
                ? `${3 - form.tags.length} more required`
                : "Ready!"}
            </p>
          </div>

          {/* Status */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Publication Status
            </span>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "draft" | "published",
                })
              }
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="draft">Save as Draft</option>
              <option value="published">Publish Now</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Saving..."
                : form.status === "draft"
                  ? "Save Draft"
                  : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
