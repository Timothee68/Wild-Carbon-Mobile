import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Button,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");

	const handleRegister = () => {
		if (pseudo && email && motDePasse) {
			fetch("adresse de l'api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pseudo,
					email,
					motDePasse,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						Alert.alert(
							"Inscription réussie",
							"Votre compte a été créé avec succès."
						);
					} else {
						Alert.alert(
							"Erreur",
							"L'inscription a échoué. Veuillez réessayer."
						);
					}
				})
				.catch((error) => {
					console.error("Erreur lors de la requête au serveur :", error);
				});
		} else {
			Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={styles.container}>
				<Text>S'inscrire</Text>
				<View>
					<TextInput
						placeholder="Pseudo"
						style={styles.input_container}
						value={pseudo}
						onChangeText={(text) => setPseudo(text)}
					/>
					<TextInput
						placeholder="Email"
						style={styles.input_container}
						keyboardType="email-address"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<TextInput
						placeholder="Mot de passe"
						style={styles.input_container}
						secureTextEntry={true}
						value={motDePasse}
						onChangeText={(text) => setMotDePasse(text)}
					/>
					<TouchableOpacity onPress={handleRegister}>
						<Button color={"#7ED957"} title="Créer mon compte'" />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
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
});
