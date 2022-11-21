import axios from "axios";
import { useEffect, useState } from "react";

const FavoriteComics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel--h9xmd52lw246.code.run/favoritescomics"
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch ({ error }) {
        console.log(error.data.message);
      }
    };
    fetchData();
  });

  return isLoading ? (
    <div className="container loading">
      <p>Loading ...</p>
    </div>
  ) : (
    <>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <image src={data.image} alt="comics" />
    </>
  );
};
export default FavoriteComics;
