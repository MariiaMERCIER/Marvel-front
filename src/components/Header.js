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
          <Link to="/characters">
            <span>CHARACTERS</span>
          </Link>
          <span>MES FAVORIS</span>

          <button>Sing in | Join </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
