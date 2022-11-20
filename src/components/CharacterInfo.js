import characterIndefined from "../assets/images/characterUndefined.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterInfo = ({ character }) => {
  return (
    <Link to={`/character/${character._id}`}>
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
            <button>
              FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CharacterInfo;
