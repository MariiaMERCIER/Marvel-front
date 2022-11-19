import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import characterIndefined from "../assets/images/characterUndefined.jpeg";
import noImageHero from "../assets/images/noImageComics.jpeg";
import ComicsInfo from "../components/ComicsInfo";

const Character = () => {
  const [dataCH, setDataCH] = useState([]);
  const [dataCOM, setDataCOM] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  // console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCH = await axios.get(
          `http://localhost:4000/character/${characterId}`
        );
        // console.log(responseCH.data);

        setDataCH(responseCH.data);
      } catch (error) {
        console.log(error.responseCH.data);
      }
    };

    fetchData();
  }, [characterId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCOM = await axios.get(
          `http://localhost:4000/comics/${characterId}`
        );
        // console.log(responseCOM.data);
        setDataCOM(responseCOM.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.responseCOM.data);
      }
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div className="container loading">
      <p>Loading ...</p>
    </div>
  ) : (
    <>
      <div className="banner">
        <div className="container">
          <div className="fiche-hero">
            {dataCH.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
            dataCH.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
              <img src={characterIndefined} alt="character" />
            ) : (
              <img
                src={dataCH.thumbnail.path + "." + dataCH.thumbnail.extension}
                alt="character"
              />
            )}

            <div className="biography">
              <h3 className="title-hero">{dataCH.name}</h3>

              {dataCH.description && (
                <div>
                  <span>BIOGRAPHY</span>
                  <p>{dataCH.description}</p>
                </div>
              )}
              <div className="favorite ">
                <button>
                  FAVORITE <FontAwesomeIcon icon="fa-solid fa-heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="comics">
          {dataCOM.comics.map((elem) => {
            // console.log(elem);
            return (
              <div className="card" key={elem._id}>
                {elem.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img src={noImageHero} alt="comics" />
                ) : (
                  <img
                    src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                    alt="comics"
                  />
                )}{" "}
                <p>{elem.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Character;
