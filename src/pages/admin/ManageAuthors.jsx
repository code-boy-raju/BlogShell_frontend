
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthors,
  toggleAuthor,
  deleteAuthor,
  assignPermissions,
} from "../../redux/actions/adminActions";
import { toast, Toaster } from "react-hot-toast";
import {
  FaUsers,
  FaToggleOn,
  FaShieldAlt,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaTimes,
  FaSave,
} from "react-icons/fa";

export default function ManageAuthors() {
  const dispatch = useDispatch();
  const { authors, loading, searchText } = useSelector((state) => state.admin);

  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [permissions, setPermissions] = useState({
    canViewPosts: false,
    canCreatePosts: false,
    canEditPosts: false,
    canDeletePosts: false,
  });

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch]);

  const filteredAuthors = authors.filter((a) => {
    if (!searchText) return true;
    const search = searchText.toLowerCase();
    return (
      a.name.toLowerCase().includes(search) ||
      a.email.toLowerCase().includes(search)
    );
  });

  const openPermissionsModal = (author) => {
    setSelectedAuthor(author);
    setPermissions({
      canViewPosts: author.permissions?.canViewPosts || false,
      canCreatePosts: author.permissions?.canCreatePosts || false,
      canEditPosts: author.permissions?.canEditPosts || false,
      canDeletePosts: author.permissions?.canDeletePosts || false,
    });
    setShowPermissionsModal(true);
  };

  const closePermissionsModal = () => {
    setShowPermissionsModal(false);
    setSelectedAuthor(null);
  };

  const handlePermissionToggle = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const savePermissions = () => {
    dispatch(assignPermissions(selectedAuthor._id, permissions, toast));
    closePermissionsModal();
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center space-x-2">
            <FaUsers className="text-indigo-600" />
            <span>Manage Authors</span>
          </h1>
          <p className="text-gray-500 mt-1">View and manage all author accounts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow border-2 border-gray-100">
          <span className="text-sm text-gray-500">Total: </span>
          <span className="text-lg font-bold text-indigo-600">{filteredAuthors.length}</span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin border-4 border-indigo-500 border-t-transparent rounded-full w-12 h-12"></div>
        </div>
      )}

      {!loading && filteredAuthors.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
          <FaUsers className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No authors found.</p>
        </div>
      )}

      {!loading && filteredAuthors.length > 0 && (
        <div className="space-y-4">
          {filteredAuthors.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <h3 className="font-bold text-gray-800 text-lg truncate">{a.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center space-x-1 truncate">
                        <FaEnvelope className="text-gray-400" />
                        <span className="truncate">{a.email}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    {a.status === 'active' ? (
                      <span className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        <FaCheckCircle />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        <FaTimesCircle />
                        <span>Inactive</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => dispatch(toggleAuthor(a._id, toast))}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    <FaToggleOn />
                    <span>Toggle Status</span>
                  </button>

                  <button
                    onClick={() => openPermissionsModal(a)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    <FaShieldAlt />
                    <span>Manage Permissions</span>
                  </button>

                  <button
                    onClick={() => dispatch(deleteAuthor(a._id, toast))}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
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

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border-2 border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center space-x-2 truncate">
                <FaShieldAlt className="text-green-600" />
                <span>Manage Permissions</span>
              </h2>
              <button
                onClick={closePermissionsModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Author Info */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border-2 border-indigo-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  {selectedAuthor?.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <p className="font-bold text-gray-800 truncate">{selectedAuthor?.name}</p>
                  <p className="text-sm text-gray-600 truncate">{selectedAuthor?.email}</p>
                </div>
              </div>

              {/* Permission Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PermissionToggle
                  label="View Posts"
                  description="Allow viewing all posts"
                  enabled={permissions.canViewPosts}
                  onToggle={() => handlePermissionToggle('canViewPosts')}
                />
                <PermissionToggle
                  label="Create Posts"
                  description="Allow creating new posts"
                  enabled={permissions.canCreatePosts}
                  onToggle={() => handlePermissionToggle('canCreatePosts')}
                />
                <PermissionToggle
                  label="Edit Posts"
                  description="Allow editing existing posts"
                  enabled={permissions.canEditPosts}
                  onToggle={() => handlePermissionToggle('canEditPosts')}
                />
                <PermissionToggle
                  label="Delete Posts"
                  description="Allow deleting posts"
                  enabled={permissions.canDeletePosts}
                  onToggle={() => handlePermissionToggle('canDeletePosts')}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 p-4 border-t border-gray-200">
              <button
                onClick={closePermissionsModal}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={savePermissions}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
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

// Permission Toggle Component
function PermissionToggle({ label, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-all">
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          enabled 
            ? 'bg-gradient-to-r from-green-500 to-green-600 focus:ring-green-500' 
            : 'bg-gray-300 focus:ring-gray-400'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            enabled ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0'
          }`}
        >
          {enabled ? (
            <FaCheckCircle className="text-green-600 text-xs sm:text-sm" />
          ) : (
            <FaTimesCircle className="text-gray-400 text-xs sm:text-sm" />
          )}
        </span>
      </button>
    </div>
  );
}
