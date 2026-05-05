import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({});

  const handleRegister = () => {
    axios.post("http://localhost:8081/auth/register", user)
      .then(() => alert("Registered Successfully"));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f9f5f5]">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center text-[#800020] mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-[#800020] text-white py-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#800020] font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;