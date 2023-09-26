import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
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
import { Button } from "@rneui/base";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data?.login && data.login.success) {
        setIsLoggedIn(true);
        setErrorMessage(null);
        setUserId(data.login.user.id);
        setUserToken(data.login.token);
        saveUserTokenInLocalStorage({ userToken: data.login.token });
        navigateToHome();
      } else {
        setErrorMessage("Identifiants invalides");
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const { setIsLoggedIn, setUserToken, setUserId } = useLoginContext();
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
    setErrorMessage("");
    await login({
      variables: {
        email: email,
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
              placeholder="Email"
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
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            {loading ? (
              <Text style={styles.loadingMessage}>Loading...</Text>
            ) : (
              <Button
                color="#7ED957"
                onPress={() => handleLogin()}
                title="Me connecter"
                containerStyle={styles.button}
              />
            )}

            <Button
              containerStyle={styles.button}
              onPress={() => navigateToRegister()}
              title="Créer un compte"
            />
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
  button: {
    marginTop: 30,
  },
});
