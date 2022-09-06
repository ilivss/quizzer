import React from "react";
import { Routes, Route } from "react-router-dom";

import { NewQuiz } from "./pages/NewQuiz";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<NewQuiz />} />
        <Route path="about" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
