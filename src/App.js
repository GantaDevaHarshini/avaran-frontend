import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <BrowserRouter>
      {user && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/shop" element={user ? <Shop cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={user ? <Checkout cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
