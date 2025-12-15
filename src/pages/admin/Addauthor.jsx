
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function AddAuthor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/admin/addauthor",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Author ${data.name} created successfully`);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Author creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster position="top-right" />
      
      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
            <FaUserPlus className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Author</h2>
            <p className="text-gray-500 text-sm">Create a new author account</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaUser className="text-gray-400" />
              <span>Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter author name"
              className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaEnvelope className="text-gray-400" />
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 flex items-center space-x-2">
              <FaLock className="text-gray-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create temporary password"
              className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <FaUserPlus />
                <span>Add Author</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}