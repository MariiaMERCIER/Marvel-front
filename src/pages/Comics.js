import axios from "axios";

// import Footer from "../components/Footer";
import ComicsInfo from "../components/ComicsInfo";

import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/comics", {
          params: {
            title: search,
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
  }, [search, limit, skip]);

  const handleSerchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event) => {
    setLimit(event.target.value);
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
          onChange={handleSerchChange}
        />
        <select className="articles-page" onChange={handlePageChange}>
          <option>Number comics/page</option>
          <option>15</option>
          <option>20</option>
          <option>35</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div className="comics">
        {data.results.map((comics) => {
          return <ComicsInfo comics={comics} key={comics._id} />;
        })}
      </div>
    </div>
  );
};

export default Comics;
