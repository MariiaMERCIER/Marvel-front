import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div className="container loading">
      <p>Loading ...</p>
    </div>
  ) : (
    <div className="container">
      <p>Hello!</p>
    </div>
  );
};

export default Character;
