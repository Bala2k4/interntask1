import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg]   = useState("");

  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", { // 👈 updated URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.status === 201) {
        navigate("/login");
      } else {
        setMsg(data.msg);
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email"    name="email"    placeholder="Email"    required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button>Sign Up</button>
      </form>
      {msg && <p>{msg}</p>}
    </section>
  );
}