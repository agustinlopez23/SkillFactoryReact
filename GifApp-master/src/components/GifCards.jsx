import "../assets/css/GifCards.css";
import { useEffect, useState } from "react";
import GiftCardItem from "./GiftCardItem";

import { useFetchGif } from "../hooks/useFetchGif";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";

export default function GifCards({ category }) {
  const { imagenes, loading } = useFetchGif(category);

  return (
    <>
      <div className="giftCards-container">
        {loading ? (
          <h2>Cargando...</h2>
        ) : (
          imagenes.map((imagen) => <GiftCardItem key={imagen.id} {...imagen} />)
        )}
      </div>
    </>
  );
}
