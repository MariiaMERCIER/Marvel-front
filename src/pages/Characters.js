import { useEffect, useState } from "react";
import axios from "axios";
import newCharacter from "../assets/images/nico.jpeg";
import CharacterInfo from "../components/CharacterInfo";
import LottieBird from "../components/Lottie";
import ToolBar from "../components/ToolBar";
import Banner from "../components/Banner";

const Characters = ({ token, email }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { page } = useState(1);
  const [limit, setLimit] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters", {
          params: {
            name: search,
            limit: limit,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catchCharacters >>", error.data.message);
      }
    };

    fetchData();
  }, [search, limit, page]);

  const handleSelectChange = (event) => {
    setLimit(event.target.value);
  };
  const handleSerchChange = (event) => {
    setSearch(event.target.value);
  };

  const title = "CHARACTER NEWS";
  const link =
    "https://www.marvel.com/articles/comics/nico-minoru-runaways-midnight-suns-explained";
  const description = " Meet Nico Minoru, Former Runaway Turned Midnight Sun";

  return isLoading ? (
    <LottieBird />
  ) : (
    <>
      <Banner
        title={title}
        news={newCharacter}
        link={link}
        description={description}
      />

      <div className="container" style={{ minHeight: "50vh" }}>
        <ToolBar
          handleSelectChange={handleSelectChange}
          handleSerchChange={handleSerchChange}
        />

        <div className="character">
          {data.results.map((character) => {
            return (
              <CharacterInfo
                character={character}
                token={token}
                key={character._id}
                email={email}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Characters;
