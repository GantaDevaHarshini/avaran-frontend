import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {

  const increase = (i) => {
    const updated = [...cart];
    updated[i].qty += 1;
    setCart(updated);
  };

  const decrease = (i) => {
    const updated = [...cart];
    if (updated[i].qty > 1) {
      updated[i].qty -= 1;
      setCart(updated);
    }
  };

  const remove = (i) => {
    setCart(cart.filter((_, index) => index !== i));
  };

  return (
    <div className="px-10 py-10">

      <h2 className="text-3xl font-bold text-[#800020] mb-6">
        Cart
      </h2>

      {cart.length === 0 && <p className="text-center">Your cart is empty</p>} : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between items-center mb-4 shadow p-4">

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="flex gap-2 items-center">
                <button onClick={() => decrease(i)} className="px-2 bg-gray-300">-</button>
                <span>{item.qty}</span>
                <button onClick={() => increase(i)} className="px-2 bg-gray-300">+</button>
              </div>

              <button onClick={() => remove(i)} className="text-red-600">
                Remove
              </button>

            </div>
          ))}

          {/* ✅ Checkout Button */}
          <Link to="/checkout">
            <button className="mt-6 bg-[#800020] text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )

    </div>
  );
}

export default Cart;