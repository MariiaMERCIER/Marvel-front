import { useEffect, useState } from "react";
import axios from "axios";
import LottieBird from "../components/Lottie";

import ComicsInfo from "../components/ComicsInfo";

import newComics from "../assets/images/comicsnew.jpeg";
import ToolBar from "../components/ToolBar";
import Banner from "../components/Banner";

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
        const response = await axios.get(
          "https://site--marvel--h9xmd52lw246.code.run/comics",
          {
            params: {
              title: search,
              limit: limit,
              skip: skip,
            },
          }
        );

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

  const handleSelectChange = (event) => {
    setLimit(event.target.value);
  };

  const title = "COMICS NEWS";
  const link =
    "https://www.marvel.com/articles/comics/new-sins-of-sinister-designs";
  const description =
    "See How a World Controlled by Mister Sinister Influences Storm, Captain America, and More in New Sins of Sinister Designs";

  return isLoading ? (
    <LottieBird />
  ) : (
    <>
      <Banner
        title={title}
        news={newComics}
        link={link}
        description={description}
      />

      <div className="container" style={{ minHeight: "50vh" }}>
        <ToolBar
          handleSelectChange={handleSelectChange}
          handleSerchChange={handleSerchChange}
        />
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
        <button>SEE MORE</button>
      </div>
    </>
  );
};

export default Comics;
