import React from "react";
import { StatusOrbProps } from "../interfaces/ComponentProps";

const StatusOrb: React.FC<StatusOrbProps> = ({ status }) => {
  const orbStyle: React.CSSProperties = {
    height: "10px",
    width: "10px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: "gray", // Default color
  };

  if (status === null) {
    orbStyle.backgroundColor = "yellow"; // Loading
  } else if (status === true) {
    orbStyle.backgroundColor = "green"; // True
  } else if (status === false) {
    orbStyle.backgroundColor = "red"; // False
  }

  return <span style={orbStyle}></span>;
};

export default StatusOrb;
