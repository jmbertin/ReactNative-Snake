import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
	reloadGame: () => void;
	pauseGame: () => void;
	isPaused: boolean;
	children: JSX.Element;
	isGameOver: boolean;
}

export default function Header({
	children,
	reloadGame,
	pauseGame,
	isPaused,
	isGameOver,
}: HeaderProps): JSX.Element {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={reloadGame}>
				<FontAwesome name="refresh" size={24} color={Colors.primary} />
			</TouchableOpacity>
			{!isGameOver && (
				<TouchableOpacity
				onPress={pauseGame}
				disabled={isGameOver}
				>
				<FontAwesome
					name={isPaused ? "play" : "pause"}
					size={24}
					color={Colors.primary}
				/>
				</TouchableOpacity>
			)}
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.08,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: Colors.primary,
		padding: 15,
		backgroundColor: Colors.background,
		borderWidth: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
