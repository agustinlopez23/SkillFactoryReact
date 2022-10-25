import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = process.env.REACT_APP_API_NEWS_KEY;
const baseUrl = "https://finnhub.io/api/v1";
const createRequest = (url) => ({ url });
export const criptoNewsApi = createApi({
  reducerPath: "criptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (category) =>
        createRequest(`/news?category=${category}&token=${token}`),
    }),
  }),
});

export const { useGetNewsQuery } = criptoNewsApi;
