
import { message } from "antd";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
 
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  addFavoriteCrypto,
  addFavoriteExchange,
  addFavoriteNews,
  deleteCryptoById,
  deleteExchangeById,
  deleteNewsById,
  getFavoriteCryptos,
  getFavoriteExchanges,
  getFavoriteNews,
  isSaved,
  isSaving,
} from "./favoritesSlice";

//Get
export const getFavoriteNew = () => {
  return async (dispatch, getState) => {
    const { uid } = await getState().auth;

    const collectionRef = collection(db, `${uid}/favorites/news`);
    const { docs } = await getDocs(collectionRef);
    const news =  docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch(getFavoriteNews(news));
  };
};
export const getFavoriteExchange = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const collectionRef = collection(db, `${uid}/favorites/exchanges`);
    const { docs } = await getDocs(collectionRef);
    const exchanges = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch(getFavoriteExchanges(exchanges));
   
  };
};
export const getFavoriteCripto = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const collectionRef = collection(db, `${uid}/favorites/cryptos`);
    const { docs } = await getDocs(collectionRef);
    const cryptos = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch(getFavoriteCryptos(cryptos));
  };
};
//Add

export const addFavoriteNew = (newFavorite) => {
  return async (dispatch, getState) => {
    dispatch(isSaving())
    const { uid } = getState().auth;

    const newDoc = doc(collection(db, `${uid}/favorites/news/`));
    const firebaseID = newDoc.id;

    const newFav = newFavorite.map((n) => ({ ...n, firebaseID }));

    await setDoc(newDoc, ...newFav);

    
      dispatch(addFavoriteNews(newFav));
  
    message.success("New added to favorites profile");
    dispatch(isSaved())
   
  };
};
export const addFavoriteExchanges = (newFavorite) => {
  return async (dispatch, getState) => {
    dispatch(isSaving())
    const { uid } = getState().auth;
    const newDoc = doc(collection(db, `${uid}/favorites/exchanges/`));

    const firebaseID = newDoc.id;
    const newFav = newFavorite.map((n) => ({ ...n, firebaseID }));
    await setDoc(newDoc, ...newFav);
    
     dispatch(addFavoriteExchange(newFav));
  
    message.success("Exchange added to favorites profile");
    ; dispatch(isSaved())
  };
};
export const addFavoriteCripto = (newFavorite) => {
  return async (dispatch, getState) => {
    dispatch(isSaving())
    const { uid } = getState().auth;
    const newDoc = doc(collection(db, `${uid}/favorites/cryptos/`));

    const firebaseID = newDoc.id;
    const newFav = newFavorite.map((n) => ({ ...n, firebaseID }));
    await setDoc(newDoc, ...newFav);

    dispatch(addFavoriteCrypto(newFav));
    message.success("Crypto added to favorites profile");
    
       dispatch(isSaved())
    
   
  };
};
//Delete

export const deleteFavoriteNew = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const { news } = getState().favorites;
    const nf = news.filter((n) => n.id === id).map((n) => n.firebaseID);

    await deleteDoc(doc(db, `${uid}`, `favorites/news/${nf}`));
    message.warning('The Favorite Exchange was deleted');
    dispatch(deleteNewsById(id));
  };
};

export const deleteFavoriteExchange = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const { exchanges } = getState().favorites;
    const nf = exchanges.filter((n) => n.id === id).map((n) => n.firebaseID);

    await deleteDoc(doc(db, `${uid}`, `favorites/exchanges/${nf}`));
    message.warning('The Favorite Exchange was deleted');
    dispatch(deleteExchangeById(id));
  };
};

export const deleteFavoriteCryptos = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const { cryptos } = getState().favorites;
    const nf = cryptos.filter((n) => n.id === id).map((n) => n.firebaseID);

    await deleteDoc(doc(db, `${uid}`, `favorites/cryptos/${nf}`));
    
    message.warning('The Favorite Crypto was deleted');
  
    dispatch(deleteCryptoById(id));

  };
};
