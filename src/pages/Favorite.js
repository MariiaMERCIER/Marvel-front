import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LottieBird from "../components/Lottie";

const Favorite = ({ token }) => {
  const [favorites, setFavorites] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchFavorites = await axios.get(
          "http://localhost:4000/favorites",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setFavorites(watchFavorites.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catchErrorWatchFavorite >>", error.message);
      }
    };
    fetchData();
  }, [token, favorites]);

  const hadleDeleteCharacter = async (name) => {
    try {
      const comicsFavorites = await axios.put(
        "http://localhost:4000/favorite/delete",
        { name: name },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("catchDeleteCharacter>>>", error.message);
    }
  };

  const handleDeleteComics = async (title) => {
    try {
      const comicsFavorites = await axios.put(
        "http://localhost:4000/favorite/delete",
        { title: title },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("catchDeleteComics>>>", error.message);
    }
  };

  return isLoading ? (
    <LottieBird />
  ) : (
    <div className="container">
      <h1>FAVORITE COMICS</h1>
      {/* On affiche comics favoris */}
      <div className="comics-fav">
        {favorites.comics.map((comics) => {
          return (
            <div className="card-comics-fav" key={comics._id}>
              <div>
                {comics.avatar && (
                  <img src={comics.avatar} alt="comics-favorite" />
                )}
                <div className="text-comics">
                  <h2>{comics.title}</h2>
                  <p>{comics.description}</p>
                </div>
                <span
                  onClick={() => {
                    handleDeleteComics(comics.title);
                  }}
                >
                  x
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <h1>FAVORITE CHARACTERS</h1>
      <div className="character fav">
        {/* On affiche comics favoris  */}

        {favorites.character.map((character) => {
          return (
            <div className="card-character" key={character._id}>
              {character.avatar && (
                <img src={character.avatar} alt="character-favorite" />
              )}
              <div className="slide">
                <h2>{character.name}</h2>
                <p>{character.description}</p>
                <div className=" white">
                  <span onClick={() => hadleDeleteCharacter(character.name)}>
                    x
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
