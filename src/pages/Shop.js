import { useEffect, useState } from "react";
import api from "../api/client";

function Shop({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(cart.map((item) => (
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )));
      return;
    }

    setCart([...cart, { ...product, qty: 1 }]);
  };

  const updateQuantity = (productId, delta) => {
    setCart(
      cart
        .map((item) => (
          item.id === productId ? { ...item, qty: item.qty + delta } : item
        ))
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold text-[#800020] mb-8 text-center">
        Shop Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {status === "loading" && <p className="text-center md:col-span-3">Loading products...</p>}
        {status === "error" && <p className="text-center text-red-600 md:col-span-3">Unable to load products.</p>}

        {products
          .filter((p) => p.name && p.price > 0)
          .map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);

            return (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <img src={product.image} alt={product.name} className="h-60 w-full object-cover rounded" />

                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-[#800020] font-bold">Rs. {product.price}</p>

                {cartItem ? (
                  <div className="flex items-center gap-2 mt-4">
                    <button onClick={() => updateQuantity(product.id, -1)} className="px-2 bg-gray-300">
                      -
                    </button>
                    <span>{cartItem.qty}</span>
                    <button onClick={() => updateQuantity(product.id, 1)} className="px-2 bg-gray-300">
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-[#800020] text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Shop;
