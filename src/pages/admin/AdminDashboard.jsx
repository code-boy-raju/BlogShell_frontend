
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorDetails, getAllPosts } from "../../redux/actions/adminActions";
import { FaUsers, FaUserCheck, FaFileAlt, FaClock } from "react-icons/fa";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { details, posts, loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAuthorDetails());
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading || !details) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin border-4 border-indigo-500 border-t-transparent rounded-full w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-gray-500 flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow">
          <FaClock className="text-indigo-500" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          title="Authors" 
          value={details?.authors || 0} 
          icon={FaUsers}
          color="from-blue-500 to-blue-600"
          bgColor="bg-blue-50"
        />
        <Card 
          title="Active Authors" 
          value={details?.activeAuthors || 0}
          icon={FaUserCheck}
          color="from-green-500 to-green-600"
          bgColor="bg-green-50"
        />
        <Card 
          title="Posts" 
          value={details?.posts || 0}
          icon={FaFileAlt}
          color="from-purple-500 to-purple-600"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
          <span className="text-sm text-gray-500">{posts?.length || 0} total posts</span>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-12">
            <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No recent posts found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {posts.slice(0, 4).map((p) => (
              <div 
                key={p._id} 
                className="border-2 border-gray-100 p-5 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all duration-200 group bg-gradient-to-br from-white to-gray-50"
              >
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{p.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
                  <span className="font-medium">By {p.author?.name || 'Unknown'}</span>
                  <span className="flex items-center space-x-1">
                    <FaClock className="text-indigo-500" />
                    <span>Recently</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Card Component
const Card = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 border-gray-100">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-200 shadow-md`}>
          <Icon className={`text-3xl bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`h-2 bg-gradient-to-r ${color}`}></div>
  </div>
);