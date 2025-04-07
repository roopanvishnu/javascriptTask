import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          E-commerce Task
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{totalItems}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;