import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { UPDATE_USER } from "../../../src/gql/UserGql";
import { useMutation } from "@apollo/client";

import Ionicons from "@expo/vector-icons/Ionicons";

interface ModalUpdatePasswordUserProps {
  userId: string;
  refetch: () => void;
  styles: any;
}

export default function ModalUpdatePasswordUser({
  userId,
  refetch,
  styles,
}: ModalUpdatePasswordUserProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { userId },
  });

  const handleUpdatePasswordUser = async () => {
    try {
      if (password !== ConfirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas.");
        return;
      }

      await updateUser({
        variables: {
          userId: userId,
          password: password,
        },
      });

      setModalVisible(false);
      setPasswordError("");
      refetch();
      Alert.alert(
        "Mise à jour réussie",
        "Vos informations ont été mises à jour avec succès."
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
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
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Modification du mot de passe</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Nouveau mot de passe"
                style={{ ...styles.input, width: 300 }}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                <Text>
                  <Ionicons
                    size={25}
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  ></Ionicons>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Confirmer mot de passe"
                style={{ ...styles.input, width: 300 }}
                secureTextEntry={!isConfirmPasswordVisible}
                value={ConfirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                <Text>
                  <Ionicons
                    size={25}
                    name={
                      isConfirmPasswordVisible
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                  ></Ionicons>
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.textError}>{passwordError}</Text>
            ) : null}
            <View style={styles.button}>
              <Button
                title="Enregistrer"
                color="#7ED957"
                onPress={handleUpdatePasswordUser}
              />
            </View>
            <View style={{ ...styles.button, marginTop: 30 }}>
              <Button
                title="X"
                color="#7ED957"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.button}>
        <Button
          title="Modifier mot de passe"
          color="#7ED957"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
}
