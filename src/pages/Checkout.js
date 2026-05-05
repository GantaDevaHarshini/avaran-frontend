import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login first</p>;
  }

  const handleOrder = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!name || !mobile || !address) {
      setMessage("Fill all fields before placing the order.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/orders", {
        name,
        mobile,
        address,
        total,
        userEmail: user.email,
        items: JSON.stringify(cart),
      });
      setCart([]);
      navigate("/");
    } catch {
      setMessage("Error placing order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold text-[#800020] mb-6">
        Checkout
      </h2>

      <form onSubmit={handleOrder} className="max-w-xl">
        <input
          placeholder="Name"
          value={name}
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Mobile"
          value={mobile}
          className="border p-2 w-full mb-3"
          onChange={(e) => setMobile(e.target.value)}
        />

        <textarea
          placeholder="Address"
          value={address}
          className="border p-2 w-full mb-3"
          onChange={(e) => setAddress(e.target.value)}
        />

        <h3 className="mt-4">Total: Rs. {total}</h3>

        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-[#800020] text-white px-6 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Placing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
