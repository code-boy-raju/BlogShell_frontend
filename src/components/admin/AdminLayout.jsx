
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar setOpen={setOpen} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}