import { configureStore } from "@reduxjs/toolkit";
import { criptoApi } from "./api/criptoApi";
import { criptoNewsApi } from "./api/criptoNewsApi";
import authSlice from "./auth/authSlice";
import favoritesSlice from "./favorites/favoritesSlice";
export default configureStore({
  reducer: {
    [criptoApi.reducerPath]: criptoApi.reducer,
    [criptoNewsApi.reducerPath]: criptoNewsApi.reducer,
    auth: authSlice,
    favorites: favoritesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(criptoApi.middleware)
      .concat(criptoNewsApi.middleware),
});
