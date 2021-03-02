import React from "react";

//import styles from "./board.scss";

import styles from "./board.scss";
//import styles from "./App.css";

const Board: React.FC = () => {
  return (
    <div className={styles.app}>
      React Starter
      <span role="img" aria-label="rocket ship">
        🚀
      </span>
      <div className={styles.someClass}>Get Sassy!</div>
    </div>
  );
};

export default Board;
