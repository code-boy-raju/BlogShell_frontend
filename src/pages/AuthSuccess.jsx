
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../redux/actions/authActions";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);

    // Decode JWT safely (NO LIBRARY)
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);

    dispatch({
      type: LOGIN_SUCCESS,
      payload,
    });

    if (payload.role === "admin") {
      navigate("/admindashboard", { replace: true });
    } else if (payload.role === "author") {
      navigate("/authordashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center bg-white p-12 rounded-2xl shadow-2xl border-2 border-gray-100">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaSpinner className="text-white text-4xl animate-spin" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Successful!</h2>
        <p className="text-gray-600 flex items-center justify-center space-x-2">
          <FaCheckCircle className="text-green-500" />
          <span>Logging you in...</span>
        </p>
        
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}