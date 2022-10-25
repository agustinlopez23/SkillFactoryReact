export const addFavorite =  (id, array, filterArray) => {
 
  const isYet =filterArray.find((fav) => fav.id === id);
  if (isYet) return;
  const newFavorite = array.filter((n) => n.id === id);
  
  
  return newFavorite;
};
