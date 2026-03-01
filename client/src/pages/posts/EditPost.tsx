import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postAPI } from "../../api/post.api";
import { uploadAPI } from "../../api/upload.api";
import TextEditor from "../../components/editor/TextEditor";
import Spinner from "../../components/ui/Spinner";
import { useCategories } from "../../hooks/useCategories";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    content: "",
    post_picture: "",
    post_picture_id: "",
    category: "",
    tags: [],
    status: "draft",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postAPI.getPost(Number(id));
        const post = res.data.post;

        setForm({
          title: post.title,
          content: post.content,
          post_picture: post.post_picture,
          post_picture_id: post.post_picture_id,
          category: post.category,
          tags: post.tags.map((t: any) => t.name),
          status: post.status,
        });
      } catch (error) {
        alert("Failed to load post");
        navigate("/me");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);


  const addTag = () => {
    if (!tagInput.trim()) return;
    if (form.tags.length >= 5) return alert("Maximum 5 tags allowed");

    const tag = tagInput.trim().toLowerCase();
    if (!form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t: string) => t !== tag) });
  };


  const handleUpdate = async () => {
    if (!form.title.trim()) return alert("Title required");
    if (!form.content.trim()) return alert("Content required");
    if (form.tags.length < 3) return alert("Minimum 3 tags required");

    setSubmitting(true);

    try {
      let post_picture = form.post_picture;
      let post_picture_id = form.post_picture_id;

      if (form.imageFile) {
        const uploadRes = await uploadAPI.uploadPostImage(form.imageFile);
        post_picture = uploadRes.data.url;
        post_picture_id = uploadRes.data.public_id;
      }

      await postAPI.updatePost(Number(id), {
        title: form.title,
        content: form.content,
        category: form.category,
        tags: form.tags,
        status: form.status,
        post_picture,
        post_picture_id,
      });

      alert("Post updated!");
      navigate("/me");
    } catch (error: any) {
      alert(error.response?.data?.error || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || categoriesLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

          <TextEditor form={form} setForm={setForm} />

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* TAGS */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap mb-3">
              {form.tags.map((tag: string) => (
                <div
                  key={tag}
                  className="bg-blue-100 px-3 py-1 rounded-full flex gap-2"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)}>✕</button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                className="flex-1 border p-3 rounded-lg"
              />
              <button
                onClick={addTag}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* STATUS */}
          <div className="mb-8">
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="border p-2 rounded-lg"
            >
              <option value="draft">Save as Draft</option>
              <option value="published">Publish</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
            >
              {submitting ? "Updating..." : "Update Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}