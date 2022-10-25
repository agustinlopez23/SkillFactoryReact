import { types } from "../types/types";
export const heroesReducer = (state = [], action) => {
  switch (action.type) {
    case types.getAllHeroes:
      return {
        ...state,
        heroes: action.payload,
        isLoading: false,
      };
    case types.getHeroId:
      return {
        ...state,
        heroId: action.payload,
      };
    case types.returnHeroId:
      return {
        ...state,
        hero: action.payload,
      };
    case types.searchByName:
      return {
        ...state,
        search: action.payload,
      };
    case types.searchResults:
      return { ...state, results: action.payload };
    case types.resetResults:
      return { ...state, results: action.payload };
    case types.searchPublisher:
      return { ...state, results: action.payload };
    case types.filterPublisher:
      return {
        ...state,
        publisher: action.payload,
      };
    default:
      break;
  }
};
