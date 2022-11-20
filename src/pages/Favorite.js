import marvel from "../assets/images/banner-image.jpeg";
import { Link } from "react-router-dom";

const Favorite = () => {
  return (
    <>
      <div className="banner">
        <img className="favorite-image" src={marvel} alt="marvel" />
      </div>
      <div className="container">
        <div className="myfavorites">
          <h4>MY FAVORITES</h4>
          <ul>
            <Link to="/favorites/comics">
              <li>MY FAVORITE CHARACTERS</li>
            </Link>
            <Link to="/favorites/character">
              <li>MY FAVORITE COMICS</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Favorite;
