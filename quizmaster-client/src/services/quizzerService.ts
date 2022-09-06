import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizzerApi = createApi({
  reducerPath: "quizzerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = quizzerApi;
