import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import characterIndefined from "../assets/images/characterUndefined.jpeg";

const CharacterInfo = ({ character, token, email }) => {
  const navigate = useNavigate();

  const handleClickFavorite = async () => {
    if (!token) {
      navigate("/user/login");
    } else {
      try {
        // console.log(character._id, character.name, character.description, token);
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
        toast.success("You've juste added the character at favorites");

        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.error);
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
        <div className="favorite">
          <button onClick={handleClickFavorite}>
            {" "}
            FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CharacterInfo;
