import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IGetCategoriesResponse, ICreateQuizResponse } from "./types";

export const quizzerApi = createApi({
  reducerPath: "quizzerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getCategories: builder.query<IGetCategoriesResponse, void>({
      query: () => "/categories",
    }),
    createQuiz: builder.mutation<ICreateQuizResponse, void>({
      query: () => ({
        url: "/quizzes",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateQuizMutation, useGetCategoriesQuery } = quizzerApi;
