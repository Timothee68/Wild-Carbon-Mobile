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
import useLoginContext from "../../src/hooks/useLoginContext";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN } from "../../src/gql/UserGql";
import { User } from "../../src/types/UserType";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/MyStack";
import { saveUserTokenInLocalStorage } from "../../src/hooks/useLoginContext/localStorage";

type TabsScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Tabs"
>;

export default function Register() {
	const navigation = useNavigation<TabsScreenNavigationProp>();
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const { setIsLoggedIn, setUserToken, setUserId } = useLoginContext();
	const [createUser, { loading: registerLoading, error }] = useMutation<{
		createUser: User;
	}>(CREATE_USER);

	const [login, { loading: loginLoading }] = useMutation<{ login: string }>(
		LOGIN,
		{
			onCompleted: (data) => {
				if (data && data?.login !== "INVALID") {
					setIsLoggedIn(true);
					setUserToken(data.login);
					saveUserTokenInLocalStorage({ userToken: data.login });
					navigation.navigate("Tabs");
				}
			},
		}
	);

	const handleRegister = async () => {
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
					<Button
						color="#7ED957"
						onPress={handleRegister}
						title="Créer mon compte"
					/>
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
