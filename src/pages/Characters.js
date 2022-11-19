import axios from "axios";
import { useEffect, useState } from "react";

import CharacterInfo from "../components/CharacterInfo";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");

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
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.data.message);
      }
    };

    fetchData();
  }, [search, skip, limit]);

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
        <select className="articles-page" onChange={handlePageCharacterChange}>
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
          return <CharacterInfo character={character} key={character._id} />;
        })}
      </div>
    </div>
  );
};
export default Characters;
