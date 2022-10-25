import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <ReactLoading type="spin" color="#999" height={"20%"} width={"20%"} />
);

export default Loading;
