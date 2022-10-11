import React from "react";
import { Routes, Route } from "react-router-dom";

import { NewQuiz } from "./pages/NewQuiz";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewQuiz />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
