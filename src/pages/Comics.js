import { useEffect, useState } from "react";
import axios from "axios";
import LottieBird from "../components/Lottie";

import ComicsInfo from "../components/ComicsInfo";

import newComics from "../assets/images/comicsnew.jpeg";

const Comics = ({ token, email }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { page } = useState(1);
  const [limit, setLimit] = useState("");
  const { skip } = useState("");

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

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch comics >>:", error.data.message);
      }
    };
    fetchData();
  }, [search, limit, skip, page]);

  const handleSerchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event) => {
    setLimit(event.target.value);
  };

  return isLoading ? (
    <LottieBird />
  ) : (
    <>
      <div className="banner">
        <div className="fiche-hero">
          <img src={newComics} alt="newcomics" />
          <div className="news">
            <p>COMICS NEWS</p>
            <a href="https://www.marvel.com/articles/comics/new-sins-of-sinister-designs">
              See How a World Controlled by Mister Sinister Influences Storm,
              Captain America, and More in New 'Sins of Sinister' Designs
            </a>
          </div>
        </div>
      </div>
      <div className="container" style={{ minHeight: "50vh" }}>
        <div className=" topmain">
          <input
            className="search"
            type="text"
            placeholder="SEARCH"
            onChange={handleSerchChange}
          />
          <select className="articles-page" onChange={handlePageChange}>
            <option>Number/page</option>
            <option>15</option>
            <option>20</option>
            <option>35</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div className="comics">
          {data.results.map((comics) => {
            return (
              <ComicsInfo
                token={token}
                comics={comics}
                email={email}
                key={comics._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comics;
