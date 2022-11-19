import "./App.css";
import "./stylesheet.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";

import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import SignUp from "./pages/SignIn";
import LogIn from "./pages/LogIn";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faHeart);

const App = () => {
  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/comics" element={<Comics />} />
        <Route path="/" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
