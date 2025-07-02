import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import"./style.css";


export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/"         element={<Register />} />  {/* 👈 default = register */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
