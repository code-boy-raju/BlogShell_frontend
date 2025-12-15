
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorSignup } from "../redux/actions/authActions";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AuthorSignup() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(authorSignup(form));
      toast.success("Signup successful!");
      Navigate("/login");
    } catch (err) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <Toaster position="top-right" />
      
      <form 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-gray-100" 
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaUserEdit className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Author Signup</h2>
          <p className="text-gray-500 mt-2">Create your author account</p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="relative">
            <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
              <span>Signing Up...</span>
            </>
          ) : (
            <span>Create Author Account</span>
          )}
        </button>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-600 p-3 rounded-xl text-center text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}