import "./App.css";
import "./stylesheet.css";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import SignUp from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import Favorite from "./pages/Favorite";
import FavoriteComics from "./pages/FavoriteComics";
import FavoriteCharacter from "./pages/FavoriteCharacter";

library.add(faMagnifyingGlass, faHeart, faUser);

const App = () => {
  const [idComics, setIdComics] = useState("");
  const [idCharacter, setIdCharacter] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [nameUser, setNameUser] = useState(Cookies.get("nameUser") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 2 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const handleUserName = (handleUserName) => {
    if (nameUser) {
      setNameUser(nameUser);
      Cookies.set("nameUser", nameUser, { expires: 2 });
    } else {
      setNameUser(null);
      Cookies.remove("nameUser");
    }
  };

  return (
    <Router>
      <Toaster />
      <Header token={token} handleToken={handleToken} nameUser={nameUser} />
      <Routes>
        <Route
          path="/comics"
          element={
            <Comics
              token={token}
              idComics={idComics}
              setIdComics={setIdComics}
            />
          }
        />
        <Route
          path="/"
          element={
            <Characters
              token={token}
              setIdCharacter={setIdCharacter}
              idCharacter={idCharacter}
            />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <Character
              token={token}
              setIdCharacter={setIdCharacter}
              idCharacter={idCharacter}
            />
          }
        />
        <Route
          path="/user/signup"
          element={
            <SignUp
              token={token}
              setToken={setToken}
              nameUser={nameUser}
              handleToken={handleToken}
              handleUserName={handleUserName}
            />
          }
        />
        <Route
          path="/user/login"
          element={
            <LogIn
              token={token}
              setToken={setToken}
              nameUser={nameUser}
              handleToken={handleToken}
              handleUserName={handleUserName}
            />
          }
        />
        <Route path="/myfavorites" element={<Favorite />} />
        <Route path="/favorites/comics" element={<FavoriteComics />} />
        <Route path="/favorites/character" element={<FavoriteCharacter />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
