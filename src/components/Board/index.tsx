import React, { useEffect, useState } from "react";

import { Players } from "../../Players";
import Cell from "../Cell";
import styles from "./board.scss";

interface BoardProps {
  /**
   * Размерность доски.yarn
   */
  dimension: number;
}

/**
 * Доска для игры.
 * @param props проасы доски.
 */
const Board: React.FC<BoardProps> = (props: BoardProps) => {
  /**
   * Модель ячеек.
   */
  const [cellsModel, setCellsModel] = useState<number[]>(
    new Array<number>(props.dimension ** 2).fill(0)
  );

  const [personStep, setPersonStep] = useState<number | null>(null);

  const [compStep, setCompStep] = useState<number | null>(null);

  /**
   * Массив доски из индексов ячеек.
   */
  const [keysOfCells, setKeysOfCells] = useState(
    Object.keys(cellsModel).map((key) => +key)
  );

  /**
   * Массив доски из индексов ячеек. В виде двумерного массива.
   */
  const [twoDimBoardIndexes, setTwoDimBoardIndexes] = useState(
    flatArrayToTwoDimensionalArray(keysOfCells, props.dimension)
  );

  /**
   * Выигрышные линии.
   */
  const winLines = calculateWinLines(twoDimBoardIndexes, props.dimension);

  /**
   * Отслеживаем ход человека.
   */
  useEffect(() => {
    if (personStep != null) {
      computerMove();
    }
  }, [personStep]);

  /**
   * Отслеживаем ход человека.
   */
  useEffect(() => {
    if (personStep == null && compStep == null) {
      return;
    }

    const winner = calculateWinner(cellsModel, winLines);

    if (winner != null) {
      alert(winner);
    }
  }, [personStep, compStep]);

  /**
   * Ход.
   * @param index Индекс ячейки на которой был сделан ход.
   * @param player Индекс игрока.
   */
  const move = (index: number, player: number) => {
    setCellsModel((cells) => {
      const cellsCopy = cells.concat();
      cellsCopy[index] = player;
      return cellsCopy;
    });
  };

  /**
   * Ход человека.
   * @param index индекс ячейки на которой был сделан ход.
   */
  const personMove = (index: number) => {
    if (cellsModel[index] !== 0) {
      return;
    }

    move(index, Players.person);

    setPersonStep(index);
  };

  /**
   * Ход компьютера.
   */
  const computerMove = () => {
    const index = getAnyFreeCellIndex();

    move(index, Players.computer);
  };

  /**
   * Вернет индекс любой пустой ячейки.
   */
  const getAnyFreeCellIndex = () => {
    const freeSteps: number[] = [];

    cellsModel.map((model, index) => {
      if (model == 0) freeSteps.push(index);
    });

    const rndm = Math.floor(Math.random() * freeSteps.length);

    return freeSteps[rndm];
  };

  const twoDimensionCells = flatArrayToTwoDimensionalArray(
    cellsModel,
    props.dimension
  );

  return (
    <>
      <button
        onClick={() => {
          changeBoardStyleDimension(3);
          setKeysOfCells(Object.keys(cellsModel).map((key) => +key));
          setTwoDimBoardIndexes(
            flatArrayToTwoDimensionalArray(keysOfCells, props.dimension)
          );
          setCellsModel(new Array<number>(3 ** 2).fill(0));
        }}
      >
        set 3
      </button>
      <div className={styles.board}>
        {cellsModel.map((cellModel, index) => {
          const shape = cellModel == 0 ? "" : cellModel == 1 ? "X" : "O";

          return (
            <Cell
              key={index}
              index={index}
              value={shape}
              onClick={personMove}
            />
          );
        })}
      </div>
    </>
  );
};

/**
 * Плаский массив раскидает в двумерный.
 * @param flatArray плоский массив.
 * @param dimension размерность.
 */
const flatArrayToTwoDimensionalArray = (
  flatArray: number[],
  dimension: number
): number[][] => {
  const result: number[][] = [];

  for (let i = 0; i < dimension; i++) {
    const arr: number[] = [];

    for (let j = 1; j <= dimension; j++) {
      const index = dimension * i + j - 1;

      arr.push(flatArray[index]);
    }
    result.push(arr);
  }

  return result;
};

/**
 * Расчитает выигрышные линии.
 * @param twoDimArray игра - двумерный массив
 * @param dimension размерность массива
 */
const calculateWinLines = (
  twoDimArray: number[][],
  dimension: number
): number[][] => {
  const lines: number[][] = [];

  for (let i = 0; i < dimension; i++) {
    const rows: number[] = [];
    const cols: number[] = [];

    for (let j = 0; j < dimension; j++) {
      rows.push(twoDimArray[i][j]);
      cols.push(twoDimArray[j][i]);
    }

    lines.push(rows);
    lines.push(cols);
  }

  const mainAxis: number[] = [];
  for (let i = 0; i < dimension; i++) {
    mainAxis.push(twoDimArray[i][i]);
  }
  lines.push(mainAxis);

  const axis: number[] = [];
  for (let i = 0; i < dimension; i++) {
    axis.push(twoDimArray[i][dimension - 1 - i]);
  }
  lines.push(axis);

  return lines;
};

/**
 * Расчет - кт овыиграл.
 * @param cells
 * @param lines
 * @param dimension
 */
const calculateWinner = (cells: number[], lines: number[][]): number | null => {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let lineIsWin = true;
    let winChar = null;

    for (let j = 0; j < line.length - 1; j++) {
      if (cells[line[j]] == 0 || cells[line[j]] !== cells[line[j + 1]]) {
        lineIsWin = false;
      }
      winChar = cells[line[j]];
    }

    if (lineIsWin) {
      return winChar;
    }
  }
  return null;
};

const changeBoardStyleDimension = (dimension: number) => {
  document.documentElement.style.setProperty(`--colNum`, dimension.toString());

  document.documentElement.style.setProperty(`--rowNum`, dimension.toString());
};

export default Board;
