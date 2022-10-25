import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { HeroesContext } from "../context/HeroesContext";
import { HeroList } from "../components/HeroList";
import { HeroCard } from "../components/HeroCard";

export const SearchPagePublisher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const { heroes, results, getPublishers, getHeroesByPublishers, resetSearch } =
    useContext(HeroesContext);

  const validPublishers = getPublishers();
  const selectedPublisher = e => {
    navigate(`?q=${e.target.value}`);
  };
  useEffect(() => {
    getHeroesByPublishers(q);
  }, [q]);
  useEffect(() => {
    resetSearch([...heroes]);
  }, [heroes]);
  return (
    <>
      <div className="container">
        <h1>Search by Publisher</h1>
        <form className="index_container_form">
          <h2>Select one publisher</h2>
          <select onChange={e => selectedPublisher(e)}>
            <option>Select </option>
            {validPublishers.map(publish => (
              <option key={publish} value={publish}>
                {publish}
              </option>
            ))}
          </select>
        </form>
      </div>

      <hr />

      {results?.map(hero => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </>
  );
};
