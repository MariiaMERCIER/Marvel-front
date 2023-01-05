import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import characterIndefined from "../assets/images/characterUndefined.jpeg";
import { useState } from "react";

const CharacterInfo = ({ character, token, email }) => {
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const handleClickFavorite = async () => {
    if (!token) {
      navigate("/user/login");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:4000/favorites/new",

          {
            email: email,
            name: character.name,
            description: character.description,
            avatar:
              character.thumbnail.path + "." + character.thumbnail.extension,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setClicked(true);
        toast.success("You've juste added the character at favorites");
      } catch (error) {
        console.log(
          "errorFavoritesCharacter Card>>",
          error.response.data.message
        );

        if (
          error.response.data.message ===
          "This character has already been in your favorites"
        ) {
          toast.error("You have already had this character in your favoris");
        }
      }
    }
  };

  return (
    <div className="card-character">
      {character.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
      character.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
        <img src={characterIndefined} alt="character" />
      ) : (
        <img
          src={character.thumbnail.path + "." + character.thumbnail.extension}
          alt="character"
        />
      )}
      <div className="slide">
        <h2>{character.name}</h2>
        <div>
          <p>{character.description}</p>
        </div>
        <div className="favorite ">
          <span onClick={handleClickFavorite}>
            <FontAwesomeIcon
              icon="fa-solid fa-heart"
              className={clicked ? "red" : "grey"}
            />
          </span>
          <Link to={`/character/${character._id}`}>
            <span style={{ fontSize: 18 }}>{">>"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CharacterInfo;
