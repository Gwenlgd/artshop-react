// import React from "react"
import { Outlet, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function IsAdmin() {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return <AdminDashboard />;
  }
  return <Navigate to={"/NotAllowed"} />;
}

export default IsAdmin;
