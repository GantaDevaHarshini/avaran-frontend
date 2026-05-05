import { useEffect, useState } from "react";
import axios from "axios";

function Shop({ cart, setCart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/products")
      .then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      const updated = cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  return (
    <div className="px-10 py-10">

      <h2 className="text-3xl font-bold text-[#800020] mb-8 text-center">
        Shop Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {products
          .filter(p => p.name && p.price > 0)
          .map(p => (

          <div key={p.id} className="bg-white rounded-2xl shadow p-4">

            <img src={p.image} alt={p.name} className="h-60 w-full object-cover rounded" />

            <h3 className="mt-2 font-semibold">{p.name}</h3>
            <p className="text-[#800020] font-bold">₹{p.price}</p>

           {cart.find(item => item.id === p.id) ? (
  <div className="flex items-center gap-2 mt-4">

    <button
      onClick={() => {
        const updated = cart.map(item =>
          item.id === p.id
            ? { ...item, qty: item.qty - 1 }
            : item
        ).filter(item => item.qty > 0);

        setCart(updated);
      }}
      className="px-2 bg-gray-300"
    >
      -
    </button>

    <span>
      {cart.find(item => item.id === p.id).qty}
    </span>

    <button
      onClick={() => {
        const updated = cart.map(item =>
          item.id === p.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        setCart(updated);
      }}
      className="px-2 bg-gray-300"
    >
      +
    </button>

  </div>
) : (
  <button
    onClick={() => addToCart(p)}
    className="mt-4 w-full bg-[#800020] text-white py-2 rounded"
  >
    Add to Cart
  </button>
)}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Shop;