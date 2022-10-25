import React, { useMemo } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeroesContext } from "../context/HeroesContext";
//import { getHeroeById } from "../helpers/getHeroeById";
import { types } from "../types/types";
export const HeroPage = () => {
  const { heroId } = useParams();
  const { hero, dispatch, getHeroeById } = useContext(HeroesContext);
  const navigate = useNavigate();
  useEffect(() => {
    getHeroeById(heroId);
    dispatch({ type: types.getHeroId, payload: { heroId } });
  }, [heroId]);
  const onNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="row mt-5">
      <div className="col-4 animate__animated animate__fadeInLeft">
        <img
          src={hero.heroImageUrl}
          alt={hero.superhero}
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appareance ego: </b>
            {hero.first_appearance}
          </li>
          <li className="list-group-item">
            <p>
              <b>Characters:</b>
              {hero.characters}
            </p>
          </li>
          <li className="list-group-item">
            <p className="card-text">
              <b>Gender:</b>
              {hero.gender}
            </p>
          </li>
          <li className="list-group-item">
            <p className="card-text">
              <b>Race:</b>
              {hero.race}
            </p>
          </li>
          <li className="list-group-item">
            <p className="card-text">
              <b>Work:</b>
              {hero.work}
            </p>
          </li>
        </ul>

        <button
          className="btn btn-outline-primary mt-5"
          onClick={onNavigateBack}
        >
          Back...
        </button>
      </div>
    </div>
  );
};
