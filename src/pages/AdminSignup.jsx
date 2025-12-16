
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSignup } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineUpload } from "react-icons/ai";
import { FaShieldAlt } from "react-icons/fa";

export default function AdminSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      toast.error("Please upload a document!");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("password", form.password);
    fd.append("file", form.file);

    try {
      await dispatch(adminSignup(fd,navigate,(msg)=>{
            toast.success(msg);
      }));

    } catch (err) {
      toast.error(err || msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <Toaster position="top-right" />
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-gray-100"
      >
        <div className="text-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Signup</h2>
          <p className="text-gray-500 mt-2">Create your admin account</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="relative">
            <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="relative">
            <AiOutlineUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              name="file"
              type="file"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-medium hover:file:bg-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105"
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
              <span>Signing Up...</span>
            </>
          ) : (
            <span>Create Admin Account</span>
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