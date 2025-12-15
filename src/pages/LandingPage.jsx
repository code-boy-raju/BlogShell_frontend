
import { Link } from "react-router-dom";
import { FaUserShield, FaPencilAlt, FaRocket, FaUsers, FaFileAlt, FaLock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-2xl mb-6 animate-bounce">
            <FaRocket className="text-white text-5xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Content Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A powerful platform for administrators and authors to create, manage, and publish amazing content.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
            >
              <FaLock />
              <span>Login</span>
            </Link>
            
            <Link
              to="/admin-signup"
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
            >
              <FaUserShield />
              <span>Admin Signup</span>
            </Link>
            
            <Link
              to="/author-signup"
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
            >
              <FaPencilAlt />
              <span>Author Signup</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaUserShield className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h3>
            <p className="text-gray-600">
              Comprehensive dashboard to manage authors, posts, and permissions with powerful administrative tools.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaPencilAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Author Tools</h3>
            <p className="text-gray-600">
              Create, edit, and publish content with an intuitive interface designed for writers and content creators.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaFileAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Content Management</h3>
            <p className="text-gray-600">
              Organize and manage all your content efficiently with status tracking and publication controls.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-12 border-2 border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Platform Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-3xl" />
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-2">500+</p>
              <p className="text-gray-600">Active Authors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="text-white text-3xl" />
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-2">10K+</p>
              <p className="text-gray-600">Published Posts</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserShield className="text-white text-3xl" />
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-2">50+</p>
              <p className="text-gray-600">Administrators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Content Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}