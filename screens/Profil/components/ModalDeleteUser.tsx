import React, { useState } from "react";
import { Text, View, Button, Alert, Modal } from "react-native";
import { DELETE_USER } from "../../../src/gql/UserGql";
import { useMutation } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/MyStack";
import { useNavigation } from "@react-navigation/native";
import useLoginContext from "../../../src/hooks/useLoginContext";

interface ModalDeleteUser {
	userId: string;
	styles: any;
}
type LoginScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Login"
>;
export default function ModalDeleteUser({ userId, styles }: ModalDeleteUser) {
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const navigation = useNavigation<LoginScreenNavigationProp>();
	const { setUserToken, setUserId, setIsLoggedIn } = useLoginContext();

	const [deleteUser] = useMutation(DELETE_USER, {
		variables: { userId },
	});

	const handleDeleteUser = async () => {
		try {
			await deleteUser({
				variables: {
					userId: userId,
				},
			});
			console.log(userId);
			Alert.alert(
				"Suppression réussie",
				"Vos informations ont été supprimée avec succès."
			);
			setModalDeleteVisible(false);
			setUserId("");
			setUserToken("");
			setIsLoggedIn(false);
			navigation.navigate("Login");
		} catch (error) {
			console.error("Erreur lors de la supression de l'utilisateur :", error);
			Alert.alert(
				"Erreur",
				"Une erreur est survenue. Veuillez réessayer plus tard."
			);
		}
	};

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalDeleteVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalDeleteVisible(!modalDeleteVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.text}>Etes Vous sûr ?</Text>
						<Text>La suppression est définitive.</Text>
						<View style={{ marginTop: 30 }}>
							<Button
								title="Supprimer mon compte"
								color="red"
								onPress={handleDeleteUser}
							/>
						</View>
						<View style={{ ...styles.button, marginTop: 30 }}>
							<Button
								title="Close"
								color="#7ED957"
								onPress={() => setModalDeleteVisible(!modalDeleteVisible)}
							/>
						</View>
					</View>
				</View>
			</Modal>
			<Button
				title="Supprimer mon compte"
				color="red"
				onPress={() => setModalDeleteVisible(true)}
			/>
		</View>
	);
}
