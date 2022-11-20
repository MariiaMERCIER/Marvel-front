import { Link } from "react-router-dom";
import noImageHero from "../assets/images/noImageComics.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";

const ComicsInfo = ({ comics, token }) => {
  const handleClickFavorite = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/favorites/comics",
        {
          id: comics._id,
          name: comics.title,
          description: comics.description,
          image: comics.thumbnail.path + "." + comics.thumbnail.extension,
        },

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("You've juste add the character in favoris");

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <>
      <div className="card-comics">
        {comics.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img className="test3" src={noImageHero} alt="comics" />
        ) : (
          <img
            src={comics.thumbnail.path + "." + comics.thumbnail.extension}
            alt="comics"
          />
        )}
        <div className="text">
          <h2>{comics.title}</h2>
          <p className="test">{comics.description}</p>
          <div className="favorite test2">
            {token ? (
              <button onClick={handleClickFavorite}>
                FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
              </button>
            ) : (
              <Link to="/user/login">
                <button>
                  FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
                </button>{" "}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicsInfo;
