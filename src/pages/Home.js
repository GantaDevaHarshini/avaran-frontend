import { useEffect, useState } from "react";
import api from "../api/client";

function Home() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data.filter((product) => product.name && product.price > 0));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    if (products.length === 0) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  if (status === "loading") return <p className="p-10 text-center">Loading...</p>;
  if (status === "error") return <p className="p-10 text-center text-red-600">Unable to load products.</p>;
  if (products.length === 0) return <p className="p-10 text-center">No products available yet.</p>;

  const current = products[index];

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-3xl font-bold text-[#800020] mb-8">
        Trending Designs
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <h3 className="mt-4 text-xl font-semibold">{current.name}</h3>
        <p className="text-[#800020] font-bold">Rs. {current.price}</p>

        <div className="flex justify-center mt-4 gap-2">
          {products.map((product, i) => (
            <button
              key={product.id || i}
              type="button"
              aria-label={`Show ${product.name}`}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-[#800020]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
