import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import queryString from "query-string";

import { HeroCard } from "../components/HeroCard";
import { useContext } from "react";
import { HeroesContext } from "../context/HeroesContext";
import { types } from "../types/types";
import { useEffect } from "react";

export const SearchPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const { searchText, onInputChange } = useForm({ searchText: q });

  const { searchByName, dispatch, results, resetSearch } =
    useContext(HeroesContext);
  useEffect(() => {
    resetSearch([]);
  }, []);
  useEffect(() => {
    searchByName(q);
  }, [q]);

  const onSearchSubmit = e => {
    e.preventDefault();
    if (searchText.trim().length <= 1) return;
    dispatch({ type: types.searchByName, payload: searchText });

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form>
            <input
              type="text"
              placeholder="Search Hero"
              className="form-control"
              name="searchText"
              value={searchText}
              autoComplete="off"
              onChange={onInputChange}
            />
            <button
              className="btn btn-outline-primary mt-1"
              onClick={e => onSearchSubmit(e)}
            >
              Search
            </button>
          </form>
          <button
            className="btn btn-outline-primary mt-1"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* hay un error al volver a cargar el componente */}
          <div
            className="alert alert-primary"
            style={{ display: q === "" ? "" : "none" }}
          >
            Search a Hero
          </div>

          {!results.length && q !== "" && (
            <div className="alert alert-danger">
              No hero with <b>{q}</b>
            </div>
          )}

          {results?.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
