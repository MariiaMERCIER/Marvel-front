import React from "react";

const ToolBar = ({ handleSelectChange, handleSerchChange }) => {
  return (
    <div className=" topmain">
      <input
        className="search"
        type="text"
        placeholder="SEARCH"
        onChange={handleSerchChange}
      />
      <select className="articles-page" onChange={handleSelectChange}>
        <option>Number/page</option>
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
};

export default ToolBar;
