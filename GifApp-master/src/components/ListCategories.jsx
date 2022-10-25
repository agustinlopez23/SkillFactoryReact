import React, { useEffect } from "react";
import "../assets/css/ListCategories.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
export default function ListCategories({ category, setCategory }) {
  const filter = (categoryName) => {
    const arrayFiltrado = category.filter((item) => item !== categoryName);
    setCategory(arrayFiltrado);
  };

  return (
    <div className="ListCategories-container">
      {category.map((categoryName) => (
        <h5 key={categoryName} className="btn">
          {categoryName}
          <IconButton onClick={() => filter(categoryName)}>
            <CloseIcon />
          </IconButton>
        </h5>
      ))}
    </div>
  );
}
