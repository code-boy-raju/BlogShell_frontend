
import { useState } from "react";
import { forgotPasswordApi } from "../api/authapi.js";
import { toast, Toaster } from "react-hot-toast";
import { FaEnvelope, FaPaperPlane, FaKey } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordApi({ email });
      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaKey className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-500 mt-2">Enter your email to reset password</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50 hover:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Send Reset Link</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}