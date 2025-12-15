
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, deletePost } from "../../redux/actions/authorActions.js";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { hasPermission } from "../../utils/permissions";
import { FaPlus, FaEdit, FaTrash, FaFileAlt, FaCheckCircle, FaClock } from "react-icons/fa";

export default function AuthorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myPosts, loading } = useSelector((s) => s.post);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster />
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <FaFileAlt className="text-indigo-600" />
            <span>My Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">Manage your posts and content</p>
        </div>
        
        {/* Create Post Button */}
        <button
          onClick={() => navigate("create-post")}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
        >
          <FaPlus />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin border-4 border-indigo-500 border-t-transparent rounded-full w-16 h-16 mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Loading posts...</p>
          </div>
        </div>
      ) : myPosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
          <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No posts found. Start creating your first post!</p>
          <button
            onClick={() => navigate("create-post")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <FaPlus />
            <span>Create Your First Post</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myPosts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 group"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors flex-1">
                    {post.title}
                  </h2>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center space-x-1 ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status === 'published' ? <FaCheckCircle /> : <FaClock />}
                    <span>{post.status}</span>
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex gap-2 mt-4">
                  {hasPermission(user, "canEditPosts") && (
                    <button
                      onClick={() => navigate("edit-post", { state: post })}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                  )}
                  {hasPermission(user, "canDeletePosts") && (
                    <button
                      onClick={() => dispatch(deletePost(post._id, toast))}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}