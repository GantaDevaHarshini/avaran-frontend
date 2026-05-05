import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>

      {/* 🔒 If logged in → show Navbar */}
      {user && <Navbar user={user} setUser={setUser} />}

      <Routes>

        {/* 🔐 Default route */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/shop"
          element={user ? <Shop cart={cart} setCart={setCart} /> : <Navigate to="/login" />}
        />

        <Route
          path="/cart"
          element={user ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/login" />}
        />

        <Route
          path="/checkout"
          element={user ? <Checkout cart={cart} /> : <Navigate to="/login" />}
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;