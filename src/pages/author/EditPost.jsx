
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../redux/actions/authorActions";
import { toast, Toaster } from "react-hot-toast";
import { FaEdit, FaFileAlt, FaPencilAlt, FaSave } from "react-icons/fa";

export default function EditPost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!state) {
    navigate("/authordashboard");
    return null;
  }

  const [form, setForm] = useState({
    title: state.title,
    content: state.content,
    status: state.status,
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(editPost(state._id, form, toast));
    navigate("/authordashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster />
      
      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-xl shadow-lg">
            <FaEdit className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Edit Post</h2>
            <p className="text-gray-500 text-sm">Update your post content</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaFileAlt className="text-gray-400" />
              <span>Title</span>
            </label>
            <input
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all bg-gray-50 hover:bg-white"
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
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all bg-gray-50 hover:bg-white h-48 resize-none"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Status</label>
            <select
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all bg-gray-50 hover:bg-white"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/authordashboard")}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
            >
              <FaSave />
              <span>Update Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}