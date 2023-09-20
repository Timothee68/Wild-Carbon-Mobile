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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
	const navigateToRegister = () => {
		navigation.navigate("Register");
	};

	return (
		<>
			<SafeAreaView style={styles.container}>
				<Text>Se connecter</Text>
				<View>
					<TextInput placeholder="Pseudo" style={styles.input_container} />
					<TextInput
						placeholder="Mot de passe"
						style={styles.input_container}
						secureTextEntry={true}
					/>
					<TouchableOpacity>
						<Button color={"#7ED957"} title="Me connecter" />
					</TouchableOpacity>
					<TouchableOpacity onPress={navigateToRegister}>
						<Text style={styles.link}>Créer un compte</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
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
	link: {
		color: "#7ED957",
		textAlign: "center",
		marginTop: 10,
	},
});
