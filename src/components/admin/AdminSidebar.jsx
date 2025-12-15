
import { NavLink } from "react-router-dom";
import { FaTimes, FaTachometerAlt, FaUsers, FaFileAlt, FaShieldAlt } from "react-icons/fa";

export default function AdminSidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 bg-gradient-to-b from-indigo-600 to-indigo-800 w-72 h-full shadow-2xl transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex justify-between items-center border-b border-indigo-500 md:border-none">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <FaShieldAlt className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h2 className="font-bold text-white text-xl">Admin Panel</h2>
              <p className="text-indigo-200 text-xs">Management Dashboard</p>
            </div>
          </div>
          <FaTimes 
            onClick={() => setOpen(false)}
            className="text-white cursor-pointer md:hidden hover:text-indigo-200 transition-colors duration-200"
            size={20}
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavLink 
            to="/admindashboard" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <FaTachometerAlt className="text-xl" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admindashboard/authors" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <FaUsers className="text-xl" />
            <span className="font-medium">Authors</span>
          </NavLink>

          <NavLink 
            to="/admindashboard/posts" 
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <FaFileAlt className="text-xl" />
            <span className="font-medium">Posts</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}