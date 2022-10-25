import { Action } from "history";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { fetchHeroes } from "../data/fetchHeroes";

import { types } from "../types/types";
import { HeroesContext } from "./HeroesContext";
import { heroesReducer } from "./heroesReducer";
const initialState = {
  heroes: [],
  isLoading: true,
  heroId: null,
  hero: [],
  results: [],
};
export const HeroesProvider = ({ children }) => {
  const navigate = useNavigate();
  const [heroesState, dispatch] = useReducer(heroesReducer, initialState);
  const { heroes, heroId, isLoading, hero, results, publisher } = heroesState;

  const { heroesFetch } = useFetch();
  const getAllHeroes = async () => {
    const res = await fetchHeroes();
    dispatch({
      type: types.getAllHeroes,
      payload: res,
    });
  };

  const getHeroeById = id => {
    const hero = heroes.find(hero => hero.id === parseInt(id));
    dispatch({ type: types.returnHeroId, payload: hero });
  };

  const searchByName = search => {
    name = search.toLowerCase().trim();
    if (name.length === 0) return [];

    const results = heroes?.filter(hero =>
      hero.superhero.toLowerCase().includes(name)
    );
    dispatch({ type: types.searchResults, payload: results });
  };

  const getPublishers = () => {
    const validPublishers = heroes
      ?.map(hero => hero.publisher)
      .filter(
        (value, index, self) => self.indexOf(value) === index && value != null
      );
    return validPublishers;
  };
  const getHeroesByPublishers = publish => {
    const results = heroes.filter(hero => hero.publisher === publish);

    dispatch({ type: types.searchResults, payload: results });
  };
  const resetSearch = array => {
    const results = array;
    dispatch({ type: types.searchResults, payload: results });
  };
  return (
    <HeroesContext.Provider
      value={{
        heroes,
        getAllHeroes,
        isLoading,
        dispatch,
        getHeroeById,
        hero,
        heroId,
        searchByName,
        results,
        getPublishers,
        getHeroesByPublishers,
        resetSearch,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
