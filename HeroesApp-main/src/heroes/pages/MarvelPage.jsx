import React from "react";
import { HeroList } from "../components/HeroList";

export const MarvelPage = () => {
  return (
    <div className="mt-5 animate__animated animate__fadeIn">
      <HeroList publisher={"Marvel Comics"} />
    </div>
  );
};
