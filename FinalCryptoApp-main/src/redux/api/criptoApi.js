import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "https://api.coingecko.com/api/v3/";
const createRequest = (url) => ({ url });
export const criptoApi = createApi({
  reducerPath: "criptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCriptos: builder.query({
      query: ({ count, pageNumber }) =>
        createRequest(`coins?page=${pageNumber}&per_page=${count}`),
    }),
    getCriptosPages: builder.query({
      query: (pageNumber) => createRequest(`coins?page=${pageNumber}`),
    }),
    getCriptosDetails: builder.query({
      query: (id) => createRequest(`coins/${id}`),
    }),
    getExchanges: builder.query({
      query: (pageNumber) => createRequest(`/exchanges?page=${pageNumber}`),
    }),
    getExchangesList: builder.query({
      query: () => createRequest("/exchanges/list"),
    }),
    getGobalStats: builder.query({
      query: () => createRequest("/global"),
    }),
    getHistory: builder.query({
      query: ({ timePeriod, id }) =>
        createRequest(
          `coins/${id}/market_chart?vs_currency=usd&days=${timePeriod}&interval=daily`
        ),
    }),
  }),
});

export const {
  useGetCriptosQuery,
  useGetExchangesQuery,
  useGetGobalStatsQuery,
  useGetExchangesListQuery,
  useGetCriptosDetailsQuery,
  useGetHistoryQuery,
} = criptoApi;
