import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./stylesheet.css";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faHeart,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Favorite from "./pages/Favorite";

library.add(faMagnifyingGlass, faHeart, faUser, faRightFromBracket);

const App = () => {
  const [idComics, setIdComics] = useState("");
  const [idCharacter, setIdCharacter] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [nameUser, setNameUser] = useState(Cookies.get("nameUser") || null);
  const [email, setEmail] = useState(Cookies.get("email") || null);

  const handleTokenUsername = (token, nameUser, email) => {
    if (token && nameUser && email) {
      setNameUser(nameUser);
      setToken(token);
      setEmail(email);
      Cookies.set("token", token, { expires: 2 });
      Cookies.set("nameUser", nameUser, { expires: 2 });
      Cookies.set("email", email, { expires: 2 });
    } else {
      setToken(null);
      setNameUser(null);
      setEmail(null);
      Cookies.remove("token");
      Cookies.remove("nameUser");
      Cookies.remove("email");
    }
  };

  return (
    <Router>
      <Toaster />
      <Header
        token={token}
        handleTokenUsername={handleTokenUsername}
        nameUser={nameUser}
      />
      <Routes>
        <Route
          path="/comics"
          element={
            <Comics
              token={token}
              idComics={idComics}
              setIdComics={setIdComics}
              email={email}
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
              email={email}
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
              email={email}
            />
          }
        />
        <Route
          path="/user/signup"
          element={
            <SignUp
              token={token}
              nameUser={nameUser}
              email={email}
              handleTokenUsername={handleTokenUsername}
            />
          }
        />
        <Route
          path="/user/login"
          element={
            <LogIn
              token={token}
              nameUser={nameUser}
              email={email}
              handleTokenUsername={handleTokenUsername}
            />
          }
        />
        <Route path="/myfavorites" element={<Favorite token={token} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
