import { useEffect, useState } from "react";
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
  }, [token]);

  return isLoading ? (
    <LottieBird />
  ) : (
    <div className="container favorite">
      <p>FAVORITE COMICS</p>
      {/* On affiche comics favoris */}
      <div className="comics">
        {favorites.comics.map((comics) => {
          return (
            <div className="card-comics" key={comics._id}>
              {comics.avatar && (
                <img src={comics.avatar} alt="comics-favorite" />
              )}
              <div className="text-comics">
                <h2>{comics.title}</h2>
                <p>{comics.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p>FAVORITE CHARACTER</p>
      {/* On affiche comics favoris  */}
      {favorites.character.map((character) => {
        return (
          <div key={character._id}>
            <p>{character.name}</p>
            <p>{character.description}</p>
            {character.avatar && (
              <img src={character.avatar} alt="comics-favorite" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Favorite;
