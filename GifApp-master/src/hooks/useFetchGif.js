import { useState, useEffect } from "react";
import { getGifts } from "../helpers/getGifts";
export const useFetchGif = (category) => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifts(category);

    setImagenes(newImages);
    setLoading(false);
  };
  useEffect(() => {
    getImages();
  }, []);
  return { imagenes, loading };
};
