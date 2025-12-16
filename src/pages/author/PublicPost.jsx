
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublishedPosts } from "../../redux/actions/authorActions";
import { FaGlobe, FaFileAlt, FaCheckCircle } from "react-icons/fa";

export default function PublishedPosts() {
  const dispatch = useDispatch();
  const { publishedPosts } = useSelector((s) => s.post);

  useEffect(() => {
    dispatch(getPublishedPosts());
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
          <FaGlobe className="text-green-600" />
          <span>Published Posts</span>
        </h1>
        <p className="text-gray-500 mt-1">Browse all publicly published content</p>
      </div>

      {/* Posts Grid */}
      {publishedPosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
          <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No published posts available.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 group"
            >
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-bold text-xl text-gray-800 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h2>
                  <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center space-x-1 bg-green-100 text-green-700">
                    <FaCheckCircle />
                    <span>Published</span>
                  </span>
                </div>

                <p className="text-gray-600 text-sm ">
                  {post.content}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <FaGlobe className="text-green-500" />
                      <span>Public</span>
                    </span>
                 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}