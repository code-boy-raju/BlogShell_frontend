
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaEnvelope } from "react-icons/fa";

export default function AdminSubmission() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl text-center border-2 border-gray-100">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <FaCheckCircle className="text-white text-4xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Submission Received!</h1>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-700 font-medium">
            Thank you for applying as an Admin/Instructor.
          </p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start space-x-3 text-gray-600">
            <FaClock className="text-yellow-500 mt-1 flex-shrink-0" />
            <p>Your application is now pending review by our team.</p>
          </div>
          
          <div className="flex items-start space-x-3 text-gray-600">
            <FaEnvelope className="text-blue-500 mt-1 flex-shrink-0" />
            <p>You will receive an email notification once your application has been approved or requires further action.</p>
          </div>
        </div>

        <button
          onClick={handleLoginRedirect}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Go to Login
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Please check your email regularly for updates
        </p>
      </div>
    </div>
  );
}