import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../src/gql/UserGql";
import useLoginContext from "../../src/hooks/useLoginContext";
import { saveUserTokenInLocalStorage } from "../../src/hooks/useLoginContext/localStorage";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data && data?.login !== "INVALID") {
        setIsLoggedIn(true);
        setErrorMessage(null);
        setUserToken(data.login);
        saveUserTokenInLocalStorage({ userToken: data.login });
        navigateToHome();
      } else {
        setErrorMessage("Identifiants invalides");
      }
    },
  });
  const { setIsLoggedIn, setUserToken } = useLoginContext();
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  const navigateToHome = () => {
    navigation.navigate("Tabs");
  };
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    await login({
      variables: {
        email,
        password: motDePasse,
      },
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../../assets/finalLogo.png")}
            resizeMode="contain"
            style={{ width: 300 }}
          />
          <Text>Se connecter</Text>
          <View>
            <TextInput
              placeholder="Pseudo"
              style={styles.input_container}
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
            {loading ? (
              <Text style={styles.loadingMessage}>Loading...</Text>
            ) : (
              <Button
                color={"#7ED957"}
                onPress={handleLogin}
                title="Me connecter"
              />
            )}
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
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
    borderColor: "#3C8962",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  loadingMessage: {
    textAlign: "center",
  },
});
