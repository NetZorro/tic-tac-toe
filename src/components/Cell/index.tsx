import React from "react";

type CellCallback = (n: number) => unknown;

/**
 * Пропсы ячейки.
 */
interface CellProps {
  /**
   * Номер ячейки.
   */
  index: number;

  /**
   * Отображаемое значение ячейки.
   */
  value: string | null;

  /**
   * Обраюлтчик клика по ячейке.
   */
  onClick: CellCallback;
}

/**
 * Ячейка.
 * @param props пропсы ячейки.
 */
const Cell: React.FC<CellProps> = (props: CellProps) => {
  return (
    <button onClick={() => props.onClick(props.index)}>{props.value}</button>
  );
};

export default Cell;
