import React, { useEffect, useState } from "react";
import { fetchHeroes } from "../heroes/data/fetchHeroes";

export const useFetch = () => {
  const [heroesFetch, setHeroes] = useState([]);

  const getFetch = async () => {
    const newHeroes = await fetchHeroes;
    setHeroes(newHeroes);
  };

  useEffect(() => {
    getFetch();
  }, []);

  return { heroesFetch };
};
