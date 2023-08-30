import { Coordinate } from "../types/types";

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
	return {
		x: Math.floor(Math.random() * (maxX - 2)),
		y: Math.floor(Math.random() * (maxY - 2)),
	};
};
