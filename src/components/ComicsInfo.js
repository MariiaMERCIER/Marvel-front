import noImageHero from "../assets/images/noImageComics.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicsInfo = ({ comics }) => {
  // console.log(comics._id);
  return (
    <>
      <div className="card-comics">
        {comics.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img classname="test3" src={noImageHero} alt="comics" />
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
            <button>
              FAVORITE {""}
              <FontAwesomeIcon icon="fa-solid fa-heart" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicsInfo;
