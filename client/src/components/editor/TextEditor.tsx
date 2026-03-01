import { useState } from "react";

type Props = {
  form: any;
  setForm: (form: any) => void;
};

export default function TextEditor({ form, setForm }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    // Store file
    setForm({ ...form, imageFile: file });
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm({ ...form, imageFile: null });
    setImagePreview(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full text-4xl font-bold outline-none mb-6 p-2"
      />

      <div className="mb-6">
        {imagePreview && (
          <div className="relative mb-4">
            <img src={imagePreview} className="w-full rounded-xl" alt="Cover" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              Remove
            </button>
          </div>
        )}

        <label className="cursor-pointer text-blue-600 font-medium hover:text-blue-700">
          {imagePreview ? "Change Cover Image" : "Add Cover Image"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files && handleImageSelect(e.target.files[0])}
          />
        </label>
      </div>

      <textarea
        placeholder="Tell your story..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full min-h-60 text-lg outline-none resize-none mb-6 p-2 border rounded-lg"
      />
    </div>
  );
}