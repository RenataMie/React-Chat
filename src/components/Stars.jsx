import React from "react";
import Avaliacao from "./Avaliacao";



const Stars = ({ count, handleClick }) => (
  <span>
    {[...Array(5).keys()].map(i => (
      <Avaliacao key={i} isFull={i < count} onClick={() => handleClick(i + 1)} />
    ))}
  </span>
);

Stars.defaultProps = {
  count: 1,
  handleClick: e => e
};

export default Stars;
