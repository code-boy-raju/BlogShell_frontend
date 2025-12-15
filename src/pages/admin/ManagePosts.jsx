
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  adminDeletePost,
  adminEditPost,
} from "../../redux/actions/adminActions";
import { toast, Toaster } from "react-hot-toast";
import { FaFileAlt, FaEdit, FaTrash, FaTimes, FaSave, FaUser, FaClock } from "react-icons/fa";

export default function ManagePosts() {
  const dispatch = useDispatch();
  const { posts, loading, searchText } = useSelector((s) => s.admin);

  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const startEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      status: post.status,
    });
  };

  const submitEdit = () => {
    dispatch(adminEditPost(editingPost._id, form, toast));
    setEditingPost(null);
  };

  const filteredPosts = posts.filter((p) => {
    if (!searchText) return true;

    const search = searchText.toLowerCase();
    return (
      p.title.toLowerCase().includes(search) ||
      p.content.toLowerCase().includes(search) ||
      p.author?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <FaFileAlt className="text-indigo-600" />
            <span>Manage Posts</span>
          </h1>
          <p className="text-gray-500 mt-1">View, edit, and delete all posts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow border-2 border-gray-100">
          <span className="text-sm text-gray-500">Total: </span>
          <span className="text-lg font-bold text-indigo-600">{filteredPosts.length}</span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin border-4 border-indigo-500 border-t-transparent rounded-full w-12 h-12"></div>
        </div>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
          <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      )}

      {!loading && filteredPosts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 group"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors flex-1">
                    {p.title}
                  </h2>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                    p.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.status || 'Draft'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {p.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b-2 border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {p.author?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium">{p.author?.name || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <FaClock />
                    <span>{p.author?.email}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => dispatch(adminDeletePost(p._id, toast))}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border-2 border-gray-200 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <FaEdit className="text-indigo-600" />
                <span>Edit Post</span>
              </h2>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white h-32 resize-none"
                  placeholder="Enter post content"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingPost(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>

              <button
                onClick={submitEdit}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}