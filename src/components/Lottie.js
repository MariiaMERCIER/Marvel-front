import React from "react";
import Lottie from "lottie-react";
import likeBird from "../bird-music-like.json";

const LottieBird = () => (
  <Lottie animationData={likeBird} style={{ height: "100vh" }} loop={true} />
);

export default LottieBird;
