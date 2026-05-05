import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  axios.post("http://localhost:8081/auth/login", {
    email,
    password
  }).then(res => {
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      // ✅ ADD THIS LINE HERE
      window.location.href = "/";
      
    } else {
      alert("Invalid credentials");
    }
  });
};


  return (
    <div className="h-screen flex items-center justify-center bg-[#f9f5f5]">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center text-[#800020] mb-6">
          AVARAN
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#800020] text-white py-3 rounded-lg hover:bg-[#b91c1c]"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#800020] font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
  
}

export default Login;