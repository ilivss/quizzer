import React from "react";
import { Link } from "react-router-dom";
import {
  useCreateQuizMutation,
  useGetCategoriesQuery,
  // useGetQuizByIdQuery,
} from "../services/quizzerService";
import { ICreateQuizResponse } from "../services/types";

export const NewQuiz = () => {
  const {
    data: cData,
    error: cError,
    isLoading: cIsLoading,
  } = useGetCategoriesQuery();
  const [createQuiz, { data: qData, error: qError, isLoading: qIsLoading }] =
    useCreateQuizMutation({fixedCacheKey: "current-quiz"});

  return (
    <div>
      <h1>New Quiz!</h1>
      <div style={{ border: "1px solid red" }}>
        {cError ? (
          <>Oh no, there was an error</>
        ) : cIsLoading ? (
          <>Loading...</>
        ) : cData ? (
          <>
            <select>
              {cData.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </>
        ) : null}
      </div>

      <div style={{ border: "1px solid green" }}>
        <button
          onClick={async (e) => {
            e.preventDefault();
            const newQuiz: ICreateQuizResponse = await createQuiz().unwrap();
            console.log(Object.keys(newQuiz));
          }}
          disabled={qIsLoading}
        >
          New Quiz
        </button>
        {qError ? (
          <>Oh no, there was an error</>
        ) : qIsLoading ? (
          <>Loading...</>
        ) : qData ? (
          <>
            {qData.id}
            <Link to="/approve-teams">Next</Link>
          </>
        ) : null}
      </div>
    </div>
  );
};
