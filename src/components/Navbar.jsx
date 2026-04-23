import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <h1 className="name">Dododex</h1>
      <nav className="links">

        {user ? (
          // ── LOGGED IN: show all links ──────────────────────────
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/product">Products</Link>
            <Link to="/career">Career</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/wishlist"><FontAwesomeIcon icon={faHeart} /></Link>
            <Link to="/addtocart"><FontAwesomeIcon icon={faCartShopping} /></Link>
            <span className="welcome">Welcome, {user.name}!</span>
            <button className="button" onClick={onLogout}>Log out</button>
          </>
        ) : (
          // ── NOT LOGGED IN: show only Home, About, Register ─────
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login">Register</Link>
          </>
        )}

      </nav>
    </header>
  );
}

export default Navbar;