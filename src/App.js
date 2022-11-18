import "./App.css";
import "./stylesheet.css";
import Header from "./components/Header";

import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);
// import toast, { Toast } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      {/* <Toast /> */}
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/comics" element={<Comics />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default App;
