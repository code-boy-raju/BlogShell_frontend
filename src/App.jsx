import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./redux/actions/authActions";
import { getUserFromToken } from "./utils/auth";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./pages/PreotectedRoutes";
import AuthorSignup from "./pages/AuthorSignup";
import AdminSignup from "./pages/AdminSignup";
import AdminSubmission from "./pages/AdminSubbmission";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import ManageAuthors from "./pages/admin/ManageAuthors";
import ManagePosts from "./pages/admin/ManagePosts";
import AuthorDashboard from "./pages/author/AuthorDashboard";
import AuthorLayout from "./components/author/AuthorLayout";
import CreatePost from "./pages/author/CreatePost";
import EditPost from "./pages/author/EditPost";
import PublishedPosts from "./pages/author/PublicPost";
import Landing from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AddAuthor from "./pages/admin/Addauthor";
import AuthSuccess from "./pages/AuthSuccess";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    }
  }, [dispatch]);
return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Landing/>} />
<Route path="/author-signup" element={<AuthorSignup />} />
<Route path="/admin-signup" element={<AdminSignup />} />
<Route path="auth-success" element={<AuthSuccess/>}/>
<Route path="/admin-submission" element={<AdminSubmission />} />
<Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
{/* admin routes */}
<Route
  path="/admindashboard" 
 element={<ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute> }> 
  <Route index element={<AdminDashboard />} />
  <Route path="authors" element={<ManageAuthors />} />
  <Route path="posts" element={<ManagePosts />} />
  <Route path="add-author" element={<AddAuthor/>}/>
</Route>

{/* author routes */}
<Route
  path="/authordashboard"
  element={
    <ProtectedRoute allowedRoles={["author"]}>
      <AuthorLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AuthorDashboard />} />
  <Route path="create-post" element={<CreatePost />} />
  <Route path="edit-post" element={<EditPost />} />
  <Route path="published-posts" element={<PublishedPosts />} />
</Route>
<Route path="*" element={<NotFound/>}/>
</Routes>
</BrowserRouter>
);
}

