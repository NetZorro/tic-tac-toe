import React from "react";

import Board from "../components/Board";

//import styles from "./game.scss";

/**
 * Tic-tac-toe game.
 */
const Game: React.FC = () => {
  return (
    <div>
      <Board dimension={6} />
    </div>
  );
};

export default Game;
