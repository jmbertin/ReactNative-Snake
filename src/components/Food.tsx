import { StyleSheet, Text, View } from "react-native";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";
import { CELL_SIZE } from '../utils/gameSettings';

export default function Food({ x, y }: Coordinate): JSX.Element {
	return <Text style={[{ top: y * 20, left: x * 20 }, styles.food]}></Text>;
}

const styles = StyleSheet.create({
	food: {
		position: "absolute",
		width: CELL_SIZE,
		height: CELL_SIZE,
		backgroundColor: Colors.food,
	},
});
