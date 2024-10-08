import React, { useState, useEffect } from "react";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import "./index.css";

const questions = [
  {
    question: "Which of the following song has won the 'Best original song' award at Oscar 2023?",
    options: ["A. Naatu Naaatu", "B.Naacho Naacho ", "C. Yara Teri Meri Yaari", "D. Neendran Ni Aandiyaan"],
    correctAnswer: "A. Naatu Naaatu",
  }, 
  {
    question: "Who was the first Indian to win an Oscar?",
    options: ["A. Bhanu Athaiya", "B. Satyajit Ray", "C. AR Rahamn", "D. Gulzar"],
    correctAnswer: "C. AR Rahamn ",
  },
  {
    question: "Which city is known as the Pink City of India?",
    options: ["A. Banglore", "B. Maysore", "C. Jaipur", "D. Kochi"],
    correctAnswer: "C. Jaipur",
  },
  {
    question: "How many states are there in India?",
    options: ["A. 27", "B. 28", "C. 29", "D. 32"],
    correctAnswer: "C. 29",
  },
  {
    question: "Where is India Gate located?",
    options: ["A. Punjab", "B. Mumbai", "C. New Delhi", "D. Agra"],
    correctAnswer: "D. Agra",
  },
];

const GameLargeScreen = ({ location }) => {
  const [playerList, setPlayerList] = useState(["Sainath",]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [playerScores, setPlayerScores] = useState({
    Sainath: 0,

  });

  
  const searchParams = new URLSearchParams(location.search);
  const newPlayerFromMobile = searchParams.get("player");

  useEffect(() => {

    
    
    if (newPlayerFromMobile && !playerList.includes(newPlayerFromMobile)) {
      setPlayerList((prevList) => [...prevList, newPlayerFromMobile]);
      setCurrentPlayer(newPlayerFromMobile);
      setPlayerScores((prevScores) => ({
        ...prevScores,
        [newPlayerFromMobile]: 0,
      }));
    }
  }, [newPlayerFromMobile, playerList]);

  const handlePlayerChange = (event) => {
    setCurrentPlayer(event.target.value);
    setIsGameOver(false);
    setMessage("");
    setCurrentQuestion(0);
    setAnsweredQuestions({});
    setErrorMessage("");
  };

  const handleAnswer = (option) => {
    const currentQ = questions[currentQuestion];

    if (answeredQuestions[currentQuestion]) return;

    const isCorrect = option === currentQ.correctAnswer;

    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestion]: true,
    });

    if (isCorrect) {
      setPlayerScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));

      if (currentQuestion === questions.length - 1) {
        setMessage(
          `Congratulations, ${currentPlayer}! You've completed the quiz.`
        );
        setIsGameOver(true);
      } else {
        setMessage(`Congratulations, ${currentPlayer}! You got it right!`);
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setMessage("");
        }, 2000);
      }
    } else {
      setMessage(`Oops, ${currentPlayer}, that's incorrect.`);
      setIsGameOver(true);
    }
  };

  const handleNewPlayer = () => {
    const newPlayer = prompt("Enter the name of the new player:");
    if (newPlayer) {
      if (playerList.includes(newPlayer)) {
        setErrorMessage(
          `Error: Player "${newPlayer}" already exists. Try a different name.`
        );
      } else {
        setPlayerList((prevList) => [...prevList, newPlayer]);
        setCurrentPlayer(newPlayer);
        setPlayerScores((prevScores) => ({ ...prevScores, [newPlayer]: 0 }));
        setIsGameOver(false);
        setCurrentQuestion(0);
        setAnsweredQuestions({});
        setErrorMessage("");
      }
    }
  };

  const getHighestScorer = () => {
    let maxScore = -1;
    let highestScorer = "";
    for (const player in playerScores) {
      if (playerScores[player] > maxScore) {
        maxScore = playerScores[player];
        highestScorer = player;
      }
    }
    return highestScorer;
  };

  return (
    <div className="img-container">
      <div className="quiz-container">
        <h1 className="game-title">KBC <span className="kbc-heading">GAME</span></h1>
        <div className="qr-code-section">
          <QRCode value={window.location.origin + "/join"} className="qr-code" />
          <p className="qr-description">Ready to Play? Scan the QR Code to Join!
            <br/>
            Alternatively 
            <br/>
            Add or Tap in options
          </p>
        </div>

        <div className="player-selection">
          <label className="player-label"></label>
          <select
            value={currentPlayer}
            onChange={handlePlayerChange}
            className="player-dropdown"
          >
            <option value="">--Select Player--</option>
            {playerList.map((player, index) => (
              <option key={index} value={player}>
                {player}
              </option>
            ))}
          </select>
          <button onClick={handleNewPlayer} className="add-player-btn">
            Add New Player
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {currentPlayer && !isGameOver && (
          <div className="question-section">
            <h2 className="question-number">Question: {currentQuestion + 1}</h2>
            <p className="question-text">{questions[currentQuestion].question}</p>
            
              <ul className="options-list">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAnswer(option)}
                      className="option-btn"
                      disabled={answeredQuestions[currentQuestion]} 
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          
        )}

        {message && <p className="incorrect">{message}</p>}

        {isGameOver && (
          <div className="summary-section">
            <h4 className="game-over">Game is over!</h4>
            <p className="qr-description">{currentPlayer} has completed the game.</p>
            <h1 className="qr-description">Player Card:</h1>
            <ul className="score-list">
              {playerList.map((player, index) => (
                <li className="qr-description" key={index}>
                  {player}: {playerScores[player]} Correct answers
                </li>
              ))}
            </ul>
            <h4 className="highest-scorer qr-description">
              {getHighestScorer()} answered the most questions correctly!
              <br/>
              Add NEW or SELECT Player to <span className="continue">Continue</span>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default GameLargeScreen;