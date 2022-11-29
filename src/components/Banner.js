import React from "react";
const Banner = ({ news, link, description, title }) => {
  return (
    <div className="banner">
      <div className="fiche-hero">
        <img src={news} alt="new" />
        <div className="news">
          <p>{title}</p>
          <a href={link}>{description}</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
