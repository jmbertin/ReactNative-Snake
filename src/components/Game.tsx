import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Header from './Header';
import { getMoveInterval } from '../utils/getMoveInterval';
import {
  width,
  SNAKE_INITIAL_POSITION,
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SCORE_INCREMENT,
} from '../utils/gameSettings';

export default function Game(): JSX.Element
{
  const [direction, setDirection] = React.useState<Direction>(Direction.UP);
  const [lastMoveDirection, setLastMoveDirection] = React.useState<Direction>(Direction.UP);
  const newDirectionRef = React.useRef<Direction>(Direction.UP);
  const [snake, setSnake] = React.useState<Coordinate[]>([SNAKE_INITIAL_POSITION]);
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() =>
  {
    if (!isGameOver)
    {
      const interval = setInterval(() => {
        !isPaused  && moveSnake();
      }, getMoveInterval(score));
      return () => clearInterval(interval);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    if (checkGameOver(snake, GAME_BOUNDS)) {
      setIsGameOver(true);
      return;
    }

    switch (newDirectionRef.current) {
      case Direction.UP:
        newHead.y -= 1;
        break;
      case Direction.DOWN:
        newHead.y += 1;
        break;
      case Direction.LEFT:
        newHead.x -= 1;
        break;
      case Direction.RIGHT:
        newHead.x += 1;
        break;
      default:
        break;
    }
    setLastMoveDirection(newDirectionRef.current);  // <-- Changement ici
    if (checkEatsFood(newHead, food, 1)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    let newDirection: Direction;

    if (Math.abs(translationX) > Math.abs(translationY))
      newDirection = translationX > 0 ? Direction.RIGHT : Direction.LEFT;
    else
      newDirection = translationY > 0 ? Direction.DOWN : Direction.UP;

    if (
      (newDirection == Direction.UP && lastMoveDirection == Direction.DOWN) ||
      (newDirection == Direction.DOWN && lastMoveDirection == Direction.UP) ||
      (newDirection == Direction.LEFT && lastMoveDirection == Direction.RIGHT) ||
      (newDirection == Direction.RIGHT && lastMoveDirection == Direction.LEFT)
    )
      newDirectionRef.current = lastMoveDirection;
    else
      newDirectionRef.current = newDirection;
  };

  const pauseGame = () => { setIsPaused(!isPaused); };

  const reloadGame = () => {
    setSnake([SNAKE_INITIAL_POSITION]);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setDirection(Direction.UP);
    setScore(0);
    setIsPaused(false);
  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame} isGameOver={isGameOver}>
          <Text style={{ fontSize: 24 }}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
          {isGameOver && <Text style={styles.gameOverText}>You lose.</Text>}
          {isPaused && <Text style={styles.pauseText}>Game Paused</Text>}
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: width * 0.02,
    backgroundColor: Colors.background,
  },
    gameOverText: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 36,
    fontWeight: 'bold',
    color: 'red',
  },
  pauseText: {
    textAlign: 'center',
    textAlignVertical: "center",
    position: 'absolute',
    top: '50%',
    left: '40%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});
