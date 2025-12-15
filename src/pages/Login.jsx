
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { toast, Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock, FaQuestionCircle, FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);
  const { error, loading } = useSelector((s) => s.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(login(form, navigate))
      .then(() => {
        toast.success("Logged in successfully");
        setForm(initialState);
      })
      .catch(() => toast.error("Login failed"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaSignInAlt className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-gray-50 hover:bg-white"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border-2 border-red-200 text-red-600 p-3 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        <div className="mt-4 text-right">
          <Link
            to="/forgot-password"
            className="flex items-center justify-end text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            <FaQuestionCircle className="mr-1" />
            Forgot Password?
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
          </div>
        </div>

        <button
          onClick={() => window.location.href = "http://localhost:5000/user/google"}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <FcGoogle className="text-2xl" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}