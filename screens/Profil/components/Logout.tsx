import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useLoginContext from "../../../src/hooks/useLoginContext";
import { removeUserTokenFromLocalStorage } from "../../../src/hooks/useLoginContext/localStorage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/MyStack";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Logout: React.FC = () => {
  const { setUserToken, setUserId, setIsLoggedIn } = useLoginContext();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleLogout = async () => {
    setUserId("");
    setUserToken("");
    setIsLoggedIn(false);
    await removeUserTokenFromLocalStorage();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} color="red" title="Déconnexion" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Logout;
