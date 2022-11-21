import axios from "axios";
import { useEffect, useState } from "react";
import newCharacter from "../assets/images/nico.jpeg";
import CharacterInfo from "../components/CharacterInfo";

const Characters = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel--h9xmd52lw246.code.run/characters",
          {
            params: {
              name: search,
              limit: limit,
              skip: skip,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data.message);
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
    <div className="container loading">
      <p>Loading ...</p>
    </div>
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
      <div className="container">
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
            <option>Number comics/page</option>
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
              />
            );
          })}
        </div>
        {/* <div className="pages">
          <button
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              setPage(2);
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              setPage(3);
            }}
          >
            3
          </button>{" "}
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {">"}
          </button>
          <span>...</span>
        </div> */}
      </div>
    </>
  );
};
export default Characters;
