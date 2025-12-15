
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorDetails } from "../../redux/actions/adminActions";
import { FaUsers, FaUserCheck, FaFileAlt } from "react-icons/fa";

export default function AuthorDetails() {
  const dispatch = useDispatch();
  const { details } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAuthorDetails());
  }, []);

  const stats = [
    {
      key: "authors",
      label: "Total Authors",
      icon: FaUsers,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      key: "activeAuthors",
      label: "Active Authors",
      icon: FaUserCheck,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      key: "posts",
      label: "Total Posts",
      icon: FaFileAlt,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Author Statistics</h1>
        <p className="text-gray-500 mt-1">Overview of authors and their activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map(({ key, label, icon: Icon, color, bgColor, textColor }) => (
          <div 
            key={key} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                  <Icon className={`text-3xl ${textColor}`} />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
              <p className="text-4xl font-bold text-gray-800">
                {details?.[key] || 0}
              </p>
            </div>
            <div className={`h-2 bg-gradient-to-r ${color}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}