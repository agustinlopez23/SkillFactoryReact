import React from "react";
import { Navbar } from "../../ui/components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";

import { AllHeroes } from "../pages/AllHeroes";
import { HeroPage } from "../pages/HeroPage";
import { SearchPages } from "../pages/SearchPages";
import { SearchPagePublisher } from "../pages/SearchPagePublisher";

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container ">
        <Routes>
          <Route path="search" element={<SearchPages />} />
          <Route path="searchbypublisher" element={<SearchPagePublisher />} />
          <Route path="hero/:heroId" element={<HeroPage />} />
          <Route path="allheroes" element={<AllHeroes />} />
          <Route path="/" element={<Navigate to="/allheroes" />} />
          {/* <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />*/}
        </Routes>
      </div>
    </>
  );
};
