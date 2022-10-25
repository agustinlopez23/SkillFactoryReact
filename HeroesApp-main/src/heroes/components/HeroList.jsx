import React, { useMemo } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { HeroesContext } from "../context/HeroesContext";
import { HeroCard } from "./HeroCard";
import Loading from "./Loading";
import { useCounter } from "../../hooks/useCounter";

export const HeroList = ({ results }) => {
  const { heroes, getAllHeroes, isLoading } = useContext(HeroesContext);
  const fetchHeroes = async () => {
    getAllHeroes();
  };

  useEffect(() => {
    fetchHeroes();
  }, []);
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {isLoading ? (
        <div className="container ">
          <Loading />
        </div>
      ) : (
        <>
          {heroes.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </>
      )}
    </div>
  );
};
