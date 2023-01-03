import { useState } from "react";
import { useNavigate } from "react-router-dom";

import noImageHero from "../assets/images/noImageComics.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";

const ComicsInfo = ({ comics, token, email }) => {
  const [clicked, setClicked] = useState(false);

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
        setClicked(true);
        toast.success("You've juste added the comics at favorites");
      } catch (error) {
        console.log("errorFavoritesComics >>", error.response.data.message);
        console.log(error.response.data.message);
        if (
          error.response.data.message ===
          "This comics has already been in your favorites"
        ) {
          toast.error("You have already had this comics in your favoris");
        }
      }
    }
  };
  return (
    <>
      <div className="card-comics">
        {comics.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img src={noImageHero} alt="comics" />
        ) : (
          <img
            src={comics.thumbnail.path + "." + comics.thumbnail.extension}
            alt="comics"
          />
        )}
        <div className="text-comics">
          <h2>{comics.title}</h2>
          <p>{comics.description}</p>
          <div>
            <button
              onClick={() => {
                handleClickFavorite(
                  comics.title,
                  comics.description,
                  comics.thumbnail
                );
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-heart"
                className={clicked ? "red" : "grey"}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicsInfo;
