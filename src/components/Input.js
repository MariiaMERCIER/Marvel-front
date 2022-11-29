import React from "react";
const Input = ({ value, placeholder, setFunction, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={setFunction}
    />
  );
};

export default Input;
