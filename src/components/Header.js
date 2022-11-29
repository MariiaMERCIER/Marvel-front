import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, handleTokenUsername, nameUser }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav className="menu">
          <Link to="/comics">
            <span>COMICS</span>
          </Link>
          <Link to="/">
            <span>CHARACTERS</span>
          </Link>

          {token ? (
            <>
              <Link to="/myfavorites">
                <span>MY FAVORITES</span>
              </Link>
              <div className="autorisation">
                <button
                  style={{ marginRight: 20 }}
                  onClick={() => handleTokenUsername(null)}
                  className="deconnection"
                >
                  DECONNEXION
                </button>

                <FontAwesomeIcon icon="fa-solid fa-user" />

                <span style={{ marginLeft: 10 }}>{nameUser}</span>
              </div>
            </>
          ) : (
            <div className="autorisation">
              <Link to="/user/signup">
                <button>SIGN IN </button>
              </Link>
              <span>|</span>
              <Link to="/user/login">
                <button>LOG IN</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
