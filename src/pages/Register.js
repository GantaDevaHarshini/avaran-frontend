import { useState } from "react";
import api from "../api/client";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;