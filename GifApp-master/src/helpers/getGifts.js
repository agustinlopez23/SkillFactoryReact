export const getGifts = async (category) => {
  const API_KEY = "oO7VULRJOdUnexzCaE3rDq9Fk5Y5sI2L";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${12}&offset=0&rating=g&lang=en`;
  const resp = await fetch(url);
  const { data } = await resp.json();
  const gifts = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.original.url,
  }));

  return gifts;
};
