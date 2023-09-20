import React from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
	return (
		<SafeAreaView style={styles.container}>
			<Text>S'inscrire</Text>
			<View>
				<TextInput placeholder="Pseudo" style={styles.input_container} />
				<TextInput
					placeholder="Email"
					style={styles.input_container}
					keyboardType="email-address"
				/>
				<TextInput
					placeholder="Mot de passe"
					style={styles.input_container}
					secureTextEntry={true}
				/>
				<TouchableOpacity>
					<Button color={"#7ED957"} title="Créer mon compte'" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D7CBB5",
		alignItems: "center",
		justifyContent: "center",
	},
	input_container: {
		borderWidth: 1,
		borderColor: "#7ED957",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
	},
	button: {
		backgroundColor: "#7ED957",
	},
});
