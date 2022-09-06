import React from "react";
import { useGetCategoriesQuery } from "../services/quizzerService";

export const NewQuiz = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  return (
    <div>
      <h1>New Quiz!</h1>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <select>
            {data.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
};
