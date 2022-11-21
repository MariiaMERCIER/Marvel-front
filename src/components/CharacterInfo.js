import characterIndefined from "../assets/images/characterUndefined.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";

const CharacterInfo = ({ character, token }) => {
  const handleClickFavorite = async (event) => {
    try {
      // console.log(character._id, character.name, character.description, token);
      const response = await axios.post(
        "https://site--marvel--h9xmd52lw246.code.run/favorites/character",
        {
          id: character._id,
          name: character.name,
          description: character.description,
          image: character.thumbnail.path + "." + character.thumbnail.extension,
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
        <div className="favorite">
          {/* (character.thumbnail.path + "." + character.thumbnail.extension) */}
          <Link to={`/character/${character._id}`}>
            <span>{">>"}</span>
          </Link>
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
  );
};
export default CharacterInfo;
