import React, { useState } from "react";
import {
	Image,
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLoginContext from "../../src/hooks/useLoginContext";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN } from "../../src/gql/UserGql";
import { User } from "../../src/types/UserType";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/MyStack";
import { saveUserTokenInLocalStorage } from "../../src/hooks/useLoginContext/localStorage";
import { Button } from "@rneui/base";

type TabsScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Tabs"
>;

export default function Register() {
	const navigation = useNavigation<TabsScreenNavigationProp>();
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { setIsLoggedIn, setUserToken, setUserId } = useLoginContext();
	const [createUser, { loading: registerLoading, error: registerError }] =
		useMutation<{
			createUser: User;
		}>(CREATE_USER);

	const [login, { loading: loginLoading, error: loginError }] = useMutation(
		LOGIN,
		{
			onCompleted: (data) => {
				if (data?.login && data.login.success) {
					setIsLoggedIn(true);
					setUserToken(data.login.token);
					saveUserTokenInLocalStorage({
						userToken: data.login.token,
						userId: data.login.user.id,
					});
					navigation.navigate("Tabs");
				}
			},
			onError: (error) => {
				console.error("Mutation error: ", error);
			},
		}
	);

	const handleRegister = async () => {
		if (!pseudo || !motDePasse || !email) {
			setErrorMessage("Champs requis manquants");
			return;
		}
		const { data: createdUserData } = await createUser({
			variables: { pseudo, email, password: motDePasse },
		});
		if (createdUserData?.createUser) {
			setUserId(createdUserData.createUser.id);
			await login({
				variables: {
					email: createdUserData.createUser.email,
					password: motDePasse,
				},
			});
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={styles.container}>
				<Image
					source={require("../../assets/finalLogo.png")}
					resizeMode="contain"
					style={{ width: 300 }}
				/>
				<Text style={styles.title}>S'inscrire</Text>
				<View style={styles.card}>
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

					{errorMessage ? (
						<Text style={{ ...styles.messages, color: "red" }}>
							{errorMessage}
						</Text>
					) : null}

					{loginError ? (
						<Text style={styles.messages}>{loginError.message}</Text>
					) : null}

					{registerError ? (
						<Text style={styles.messages}>{registerError.message}</Text>
					) : null}

					{loginLoading || registerLoading ? (
						<Text style={styles.messages}>Création en cours...</Text>
					) : (
						<Button
							color="#7ED957"
							onPress={handleRegister}
							title="Créer mon compte"
							containerStyle={styles.button}
						/>
					)}
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		color: "#3C8962",
		textAlign: "center",
	},
	card: {
		margin: 20,
		backgroundColor: "#fff",
		padding: 50,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
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
		padding: 10,
	},

	errorMessage: {
		textAlign: "center",
		color: "red",
		marginTop: 20,
	},
	loadingMessage: {
		textAlign: "center",
	},
	button: {
		marginTop: 30,
	},
	messages: {
		marginTop: 10,
	},
});
