import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSaved: false,
  news: [],
  cryptos: [],
  exchanges: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    getFavoriteNews: (state, { payload }) => {
      state.news = payload;
    },
    addFavoriteNews: (state, { payload }) => {
      state.news.push(payload);
    },
    getFavoriteCryptos: (state, { payload }) => {
      state.cryptos = payload;
    },
    addFavoriteCrypto: (state, { payload }) => {
      state.cryptos.push(payload);
    },
    getFavoriteExchanges: (state, { payload }) => {
      state.exchanges = payload;
    },
    addFavoriteExchange: (state, { payload }) => {
      state.exchanges.push(payload);
    },
    deleteNewsById: (state, { payload }) => {
      state.news = state.news.filter((n) => n.id !== payload);
    },
    deleteCryptoById: (state, { payload }) => {
      state.cryptos = state.cryptos.filter((n) => n.id !== payload);
    },
    deleteExchangeById: (state, { payload }) => {
      state.exchanges = state.exchanges.filter((n) => n.id !== payload);
    },
    clearOnLogout: (state) => {
      state.news = [];
      state.cryptos = [];
      state.exchanges = [];
    },
    isSaved: (state) => {
      state.isSaved = false;
    },
    isSaving: (state) => {
      state.isSaved = true;
    },
  },
});

export const {
  addFavoriteCrypto,
  addFavoriteNews,
  addFavoriteExchange,
  deleteNewsById,
  getFavoriteNews,
  getFavoriteCryptos,
  getFavoriteExchanges,
  deleteCryptoById,
  deleteExchangeById,
  isSaved,
  isSaving,
  clearOnLogout,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
