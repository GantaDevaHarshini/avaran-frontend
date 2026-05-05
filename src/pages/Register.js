import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!user.name || !user.email || !user.password) {
      setError("Complete all fields to create your account.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try another email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f9f5f5]">
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-[#800020] mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          value={user.name}
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#800020] text-white py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#800020] font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
