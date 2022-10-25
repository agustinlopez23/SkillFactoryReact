import React, { useContext } from "react";
import { HeroList } from "../components/HeroList";
import Loading from "../components/Loading";
import { HeroesContext } from "../context/HeroesContext";

export const AllHeroes = () => {
  const { isLoading } = useContext(HeroesContext);

  return (
    <div className="mt-5 animate__animated animate__fadeIn ">
      <HeroList />
    </div>
  );
};
