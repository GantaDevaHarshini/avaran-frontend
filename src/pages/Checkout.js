import { useState } from "react";
import axios from "axios";

function Checkout({ cart }) {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  return <p>Please login first</p>;
}

 const handleOrder = () => {
  if (!name || !mobile || !address) {
    alert("Fill all fields");
    return;
  }

  axios.post("http://localhost:8081/orders", {
    name,
    mobile,
    address
  })
  .then(() => alert("Order saved successfully 🎉"))
  .catch(() => alert("Error placing order"));
};
  return (
    <div className="px-10 py-10">

      <h2 className="text-3xl font-bold text-[#800020] mb-6">
        Checkout
      </h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-3"
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Mobile"
        className="border p-2 w-full mb-3"
        onChange={e => setMobile(e.target.value)}
      />

      <textarea
        placeholder="Address"
        className="border p-2 w-full mb-3"
        onChange={e => setAddress(e.target.value)}
      />

      <h3 className="mt-4">Total: ₹{total}</h3>

      <button
        onClick={handleOrder}
        className="mt-4 bg-[#800020] text-white px-6 py-2"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;