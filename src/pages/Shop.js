import { useEffect, useState } from "react";
import api from "../api/client";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        console.log("Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shop Collection</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {products.map((p) => (
          <div key={p.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px"
          }}>
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;