import { useState } from "react";
import api from "../api/client";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      alert("Login successful");
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;