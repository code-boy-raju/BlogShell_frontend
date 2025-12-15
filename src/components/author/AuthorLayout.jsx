
import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { FaBars, FaTimes, FaTachometerAlt, FaPencilAlt, FaGlobe, FaSignOutAlt, FaUserCircle, FaEnvelope } from "react-icons/fa";

export default function AuthorLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-30 border-b-2 border-green-100">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={22} className="text-gray-700" /> : <FaBars size={22} className="text-gray-700" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <FaPencilAlt className="text-white text-xl" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-800">Author Panel</span>
              <p className="text-xs text-gray-500 hidden sm:block">Content Management</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink 
            to="/authordashboard" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-green-50'
              }`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="create-post" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-green-50'
              }`
            }
          >
            <FaPencilAlt />
            <span>Create Post</span>
          </NavLink>

          <NavLink 
            to="published-posts" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-green-50'
              }`
            }
          >
            <FaGlobe />
            <span>Published Posts</span>
          </NavLink>

          {/* User Info */}
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 flex items-center space-x-1">
                <FaEnvelope className="text-xs" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 md:hidden bg-white shadow-2xl z-50 border-b-2 border-gray-200">
            <div className="flex flex-col gap-2 p-4">
              <NavLink
                to="/authordashboard"
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <FaTachometerAlt />
                <span className="font-medium">Dashboard</span>
              </NavLink>

              <NavLink
                to="create-post"
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <FaPencilAlt />
                <span className="font-medium">Create Post</span>
              </NavLink>

              <NavLink
                to="published-posts"
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <FaGlobe />
                <span className="font-medium">Published Posts</span>
              </NavLink>

              <div className="border-t-2 border-gray-200 my-2"></div>

              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => dispatch(logout())}
                className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md font-medium mt-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}