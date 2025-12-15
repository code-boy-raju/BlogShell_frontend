
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/authorActions";
import { toast, Toaster } from "react-hot-toast";
import { FaFileAlt, FaPencilAlt, FaSave } from "react-icons/fa";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(createPost(form, toast));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster />
      
      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaPencilAlt className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Create Post</h2>
            <p className="text-gray-500 text-sm">Write and publish your content</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaFileAlt className="text-gray-400" />
              <span>Title</span>
            </label>
            <input
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
              placeholder="Enter post title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaPencilAlt className="text-gray-400" />
              <span>Content</span>
            </label>
            <textarea
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white h-48 resize-none"
              placeholder="Write your post content..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Status</label>
            <select
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
          >
            <FaSave />
            <span>Create Post</span>
          </button>
        </form>
      </div>
    </div>
  );
}