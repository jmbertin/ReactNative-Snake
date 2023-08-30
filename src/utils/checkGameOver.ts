import { Coordinate } from "../types/types";

export const checkGameOver = (snake: Coordinate[], boardSize: any): boolean => {
  const head = snake[0];
  const collidesWithItself = snake.slice(1).some(segment =>
    segment.x === head.x && segment.y === head.y
  );

  return (
    head.x < boardSize.xMin ||
    head.y < boardSize.yMin ||
    head.x > boardSize.xMax ||
    head.y > boardSize.yMax ||
    collidesWithItself
  )
}
