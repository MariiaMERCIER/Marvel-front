import noImageHero from "../assets/images/noImageComics.jpeg";

const ComicsInfo = ({ comics, title, setTitle }) => {
  console.log(comics._id);
  return (
    <div className="card test">
      {comics.thumbnail.path ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
        <img src={noImageHero} alt="comics" />
      ) : (
        <img
          src={comics.thumbnail.path + "." + comics.thumbnail.extension}
          alt="comics"
        />
      )}
      <p>{comics.title}</p>
      {/* <p className="test">{comics.description}</p> */}
      <div className="favorite">
        <button>FAVORITE</button>
      </div>
    </div>
  );
};

export default ComicsInfo;
