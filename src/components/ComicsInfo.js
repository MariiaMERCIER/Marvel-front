import { useNavigate } from "react-router-dom";
import noImageHero from "../assets/images/noImageComics.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";

const ComicsInfo = ({ comics, token, email }) => {
  const navigate = useNavigate();
  const handleClickFavorite = async (title, description, thumbnail) => {
    console.log(title, thumbnail, description);
    if (!token) {
      navigate("/user/login");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:4000/favorites/new",

          {
            email: email,
            title: title,
            description: description,
            avatar: thumbnail.path + "." + thumbnail.extension,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("You've juste added the comics at favorites");

        console.log(response.data);
      } catch (error) {
        console.log("errorFavoritesComics >>", error.response.data.error);
      }
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
            <button
              onClick={() => {
                handleClickFavorite(
                  comics.title,
                  comics.description,
                  comics.thumbnail
                );
              }}
            >
              {" "}
              FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicsInfo;
