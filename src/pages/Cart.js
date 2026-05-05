import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const increase = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    setCart(updated);
  };

  const decrease = (index) => {
    const updated = [...cart];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCart(updated);
      return;
    }

    setCart(updated.filter((_, itemIndex) => itemIndex !== index));
  };

  const remove = (index) => {
    setCart(cart.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold text-[#800020] mb-6">
        Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={item.id || index} className="flex justify-between items-center mb-4 shadow p-4">
              <div>
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
              </div>

              <div className="flex gap-2 items-center">
                <button onClick={() => decrease(index)} className="px-2 bg-gray-300">-</button>
                <span>{item.qty}</span>
                <button onClick={() => increase(index)} className="px-2 bg-gray-300">+</button>
              </div>

              <button onClick={() => remove(index)} className="text-red-600">
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-lg font-semibold">Total: Rs. {total}</div>

          <Link to="/checkout">
            <button className="mt-6 bg-[#800020] text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
