import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow bg-white">

      <h1 className="text-2xl font-bold text-[#800020]">AVARAN</h1>

      <div className="space-x-6">

        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
            }}
            className="text-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;