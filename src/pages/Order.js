import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/orders")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h2 className="text-3xl font-bold text-[#800020] mb-6">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4 mb-4">

            <h3 className="font-semibold text-lg">{o.name}</h3>
            <p>📞 {o.mobile}</p>
            <p>📍 {o.address}</p>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;