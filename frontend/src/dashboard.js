import React from "react";
import { useLocation } from "react-router-dom";


export default function Dashboard() {
  const location = useLocation();
  const email = location.state?.email || "User";

  return (
    <div className="container">
      <div className="form-box">
        <h2>Dashboard</h2>
        <p>Welcome back, {email} 👋</p>
        <p>You’ve successfully logged in.</p>
      </div>
    </div>
  );
}
