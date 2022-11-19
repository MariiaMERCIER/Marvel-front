import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo" />
        <nav className="menu">
          {/* <span>HOME</span> */}
          <Link to="/comics">
            <span>COMICS</span>
          </Link>
          <Link to="/">
            <span>CHARACTERS</span>
          </Link>
          <span>MY FAVORITES</span>

          <div className="autorisation">
            <Link to="/user/signup">
              <button>SIGN IN </button>
            </Link>
            <span>|</span>
            <Link to="/user/login">
              <button>LOG IN</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
