export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number; };
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
