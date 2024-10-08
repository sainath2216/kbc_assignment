import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const GameMobileScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const history = useHistory();

  const handleJoin = () => {
    if (playerName) {
      
      history.push(`/?player=${(playerName)}`);
    }

  };

  return (
    <div className="mobile-container">
      <h1>Join the KBC Game</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
        className="player-input"
      />
      <button onClick={handleJoin} className="join-btn">
        Join Game
      </button>
    </div>
  );
};

export default GameMobileScreen;