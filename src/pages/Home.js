import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8081/products")
      .then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return <p>Loading...</p>;

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
          className="w-full h-[400px] object-cover rounded-2xl"
        />

        <h3 className="mt-4 text-xl font-semibold">{current.name}</h3>
        <p className="text-[#800020] font-bold">₹{current.price}</p>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {products.map((_, i) => (
            <div
              key={i}
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