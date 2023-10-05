import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => setQuestions(data.results))
  }, []);

  function NextQuestion() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function renderOptions(options) {
    return options.map((option, index) => (
      <li key={index}>{option}</li>
    ));
  }

  return (
    <div className="App">
      <header className="App-header">
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div>
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p>{questions[currentQuestionIndex].question}</p>
            <ul>
              {renderOptions([...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer])}
            </ul>
            <button onClick={NextQuestion}>Next Question</button>
          </div>
        ) : (
          <p></p>
        )}
      </header>
    </div>
  );
}

export default App