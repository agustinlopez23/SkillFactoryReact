import React from "react";
import { Link } from "react-router-dom";

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
  heroImageUrl,
}) => {
  return (
    <div className="col ">
      <div className="card animate__animated animate__fadeIn bg-light">
        <div className="row no-glutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>

              <p>{characters}</p>
              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>More Info...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
