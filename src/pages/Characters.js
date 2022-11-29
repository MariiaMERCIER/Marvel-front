import { useEffect, useState } from "react";
import axios from "axios";
import newCharacter from "../assets/images/nico.jpeg";
import CharacterInfo from "../components/CharacterInfo";
import LottieBird from "../components/Lottie";

const Characters = ({ token, email }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { page } = useState(1);
  const [limit, setLimit] = useState("");
  const { skip } = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters", {
          params: {
            name: search,
            limit: limit,
            skip: skip,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catchCharacters >>", error.data.message);
      }
    };

    fetchData();
  }, [search, skip, limit, page]);

  const handlePageCharacterChange = (event) => {
    setLimit(event.target.value);
  };
  const handleSerchCharacterChange = (event) => {
    setSearch(event.target.value);
  };

  return isLoading ? (
    <LottieBird />
  ) : (
    <>
      <div className="banner">
        <div className="fiche-hero">
          <img
            src={newCharacter}
            style={{ objectFit: "conver" }}
            alt="newcharacter"
          />
          <div className="news">
            <p>CHARACTER NEWS</p>
            <a href="https://www.marvel.com/articles/comics/nico-minoru-runaways-midnight-suns-explained">
              Meet Nico Minoru, Former Runaway Turned Midnight Sun
            </a>
          </div>
        </div>
      </div>
      <div className="container" style={{ minHeight: "50vh" }}>
        <div className=" topmain">
          {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
          {/* <span className="faMagnifyingGlass">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </span> */}
          <input
            className="search"
            type="text"
            placeholder="SEARCH"
            onChange={handleSerchCharacterChange}
          />
          <select
            className="articles-page"
            onChange={handlePageCharacterChange}
          >
            <option>Number/page</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div className="character">
          {data.results.map((character) => {
            // console.log(character);
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
