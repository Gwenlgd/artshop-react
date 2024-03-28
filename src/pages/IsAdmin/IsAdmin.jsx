// import React from "react"
import { Outlet, Navigate } from "react-router-dom";

function IsAdmin() {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return <Outlet />;
  }
  return <Navigate to={"/"} />;
}

export default IsAdmin;
