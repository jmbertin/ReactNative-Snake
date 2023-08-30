import { Fragment } from "react";
import { Coordinate } from "../types/types";
import { View, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
import { CELL_SIZE } from '../utils/gameSettings';

interface SnakeProps {
  snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 20,
          top: segment.y * 20,
        };
        return <View key={index} style={[styles.snake, segmentStyle]}/>;
      })}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  snake: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: Colors.snake,
  },
});
