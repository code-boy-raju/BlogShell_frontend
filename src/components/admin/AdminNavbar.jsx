

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { ADMIN_SEARCH } from "../../redux/actions/adminActions";
import { FaBars, FaSearch, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminNavbar({ setOpen }) {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.admin.searchText);
  const user = useSelector((state) => state.auth.user);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    dispatch({
      type: ADMIN_SEARCH,
      payload: e.target.value,
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-30 border-b-2 border-indigo-100">
      {/* Hamburger */}
      <button
        className="md:hidden p-2 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBars size={22} className="text-gray-700" />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md mx-4">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search posts or authors..."
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
        />
      </div>

      <div className="flex items-center space-x-3 relative">
        <Link
          to="add-author"
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
        >
          <FaUserPlus />
          <span className="hidden sm:inline">Add Author</span>
        </Link>

        {/* Admin Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all"
          >
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden z-50 transition-all duration-300 ${
              showDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-4 border-b border-gray-200">
              <p className="font-bold text-gray-800 truncate">{user?.name}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                dispatch(logout());
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-3 flex items-center space-x-2 hover:bg-red-50 text-red-600 font-medium transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
