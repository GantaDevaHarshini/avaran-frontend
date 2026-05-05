import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f9f5f5]">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-[#800020] mb-6">
          AVARAN
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#800020] text-white py-3 rounded-lg hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#800020] font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
