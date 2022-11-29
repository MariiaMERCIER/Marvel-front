import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import LottieBird from "../components/Lottie";

import characterIndefined from "../assets/images/characterUndefined.jpeg";
import noImageHero from "../assets/images/noImageComics.jpeg";

const Character = ({ token, email }) => {
  const [dataCH, setDataCH] = useState([]);
  const [dataCOM, setDataCOM] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCH = await axios.get(
          `http://localhost:4000/character/${characterId}`
        );

        setDataCH(responseCH.data);

        const responseCOM = await axios.get(
          `http://localhost:4000/comics/${characterId}`
        );

        setDataCOM(responseCOM.data);
        setIsLoading(false);
      } catch (error) {
        console.log("catchCharacter >>", error.responseCH.data);
      }
    };

    fetchData();
  }, [characterId]);

  const handleClickFavorite = async () => {
    if (!token) {
      navigate("/user/login");
    } else {
      try {
        const registerFavorite = await axios.put(
          "http://localhost:4000/favorites/new",

          {
            email: email,
            name: dataCH.name,
            description: dataCH.description,
            avatar: dataCH.thumbnail.path + "." + dataCH.thumbnail.extension,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("You've juste added the character at favorites");
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };
  return isLoading ? (
    <LottieBird />
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
                <button onClick={handleClickFavorite}>
                  {" "}
                  FAVORITE {""} <FontAwesomeIcon icon="fa-solid fa-heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="title-character">COMICS</h1>
        <div className="comics-character">
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
