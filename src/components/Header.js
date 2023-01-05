import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, handleTokenUsername, nameUser }) => {
  return (
    <header>
      <div className="container center responsive">
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
                  className="deconnection hidden"
                >
                  DISCONNECTION
                </button>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <span style={{ marginLeft: 10 }}>{nameUser}</span>
                <div onClick={() => handleTokenUsername(null)}>
                  <FontAwesomeIcon
                    className="show"
                    icon="fa-solid fa-right-from-bracket"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="autorisation">
              <Link to="/user/signup">
                <button className="hidden">SIGN IN </button>
              </Link>
              <span className="hidden">|</span>
              <Link to="/user/login">
                <button className="hidden">LOG IN</button>
              </Link>
              <Link to="/user/login">
                <FontAwesomeIcon className="show" icon="fa-solid fa-user" />
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
