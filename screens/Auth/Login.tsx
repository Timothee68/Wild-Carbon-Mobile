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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  const [pseudo, setPseudo] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleLogin = () => {
    if (pseudo === "pseudo" && motDePasse === "motDePasse") {
      Alert.alert("connexion réussie");
      navigateToHome();
    } else {
      Alert.alert("mauvais identifiants");
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <Text>Se connecter</Text>
          <View>
            <TextInput
              placeholder="Pseudo"
              style={styles.input_container}
              value={pseudo}
              onChangeText={(text) => setPseudo(text)}
            />
            <TextInput
              placeholder="Mot de passe"
              style={styles.input_container}
              secureTextEntry={true}
              value={motDePasse}
              onChangeText={(text) => setMotDePasse(text)}
            />
            <Button
              color={"#7ED957"}
              onPress={handleLogin}
              title="Me connecter"
            />
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.link}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
    padding: 10,
  },
  link: {
    color: "#7ED957",
    textAlign: "center",
    marginTop: 10,
  },
});
