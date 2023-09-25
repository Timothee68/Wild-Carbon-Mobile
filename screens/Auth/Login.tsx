import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../../src/gql/UserGql";
import useLoginContext from "../../src/hooks/useLoginContext";
import { saveUserTokenInLocalStorage } from "../../src/hooks/useLoginContext/localStorage";

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: { navigation: any }) {
  const [login, { data, error }] = useLazyQuery(LOGIN);
  const { setIsLoggedIn, setUserToken } = useLoginContext();
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };
  const navigateToHome = () => {
    navigation.navigate("Tabs");
  };
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleLogin = () => {
    login({
      variables: {
        email,
        password: motDePasse,
      },
    });
  };

  useEffect(() => {
    if (data?.login) {
      setIsLoggedIn(true);
      setUserToken(data.login);
      saveUserTokenInLocalStorage({ userToken: data.login });
      navigateToHome();
    }
  }, [data]);

  if (error) {
    console.log("error", error);
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
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
