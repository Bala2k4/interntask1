import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import for navigation

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ hook for redirecting

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(data.msg);

      if (data.msg.startsWith("Welcome")) {
        // ✅ navigate to dashboard and pass email
        navigate("/dashboard", { state: { email: form.email } });
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <section className="container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </section>
  );
}
