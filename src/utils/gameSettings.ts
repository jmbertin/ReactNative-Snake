import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');
export const CELL_SIZE = Math.floor(width / 20);
export const GAME_WIDTH = 20 * CELL_SIZE;
export const GAME_HEIGHT = Math.floor(height * 0.80);

export const SNAKE_INITIAL_POSITION = {
	x: Math.floor(GAME_WIDTH / (2 * CELL_SIZE)),
	y: Math.floor(GAME_HEIGHT / (2 * CELL_SIZE))
};
export const FOOD_INITIAL_POSITION = { x: 10, y: 10 };
export const GAME_BOUNDS = {
	xMin: 0,
	xMax: GAME_WIDTH / CELL_SIZE - 2,
	yMin: 0,
	yMax: GAME_HEIGHT / CELL_SIZE + 1
};
export const MOVE_INTERVAL = 250;
export const SCORE_INCREMENT = 10;
