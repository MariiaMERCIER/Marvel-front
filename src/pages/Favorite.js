import { useEffect, useState } from "react";
import axios from "axios";

const Favorite = ({ token }) => {
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/favorites", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setFavorites(response.data);
    };
    fetchData();
  }, [token]);
  return (
    <div className="container favorite">
      <p>FAVORITE COMICS</p>
      {/* On affiche comics favoris */}
      {favorites.comics.map((comics) => {
        return (
          <div key={comics._id}>
            <p>{comics.title}</p>
            <p>{comics.description}</p>
            {comics.avatar && <img src={comics.avatar} alt="comics-favorite" />}
          </div>
        );
      })}{" "}
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
