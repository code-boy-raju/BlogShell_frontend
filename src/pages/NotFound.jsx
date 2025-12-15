
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg border-2 border-gray-100">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaExclamationTriangle className="text-white text-4xl animate-bounce" />
        </div>

        <h1 className="text-8xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaHome />
          <span>Go Back Home</span>
        </Link>

        <div className="mt-8 text-sm text-gray-500">
          <p>Error Code: 404 - Page Not Found</p>
        </div>
      </div>
    </div>
  );
}