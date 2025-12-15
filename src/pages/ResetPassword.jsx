
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordApi } from "../api/authapi.js";
import { toast, Toaster } from "react-hot-toast";
import { FaLock, FaCheckCircle } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, { newPassword: password });
      toast.success("Password reset successful");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaLock className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-500 mt-2">Enter your new password</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all bg-gray-50 hover:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>Reset Password</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700 text-center">
            Password must be at least 6 characters long
          </p>
        </div>
      </div>
    </div>
  );
}