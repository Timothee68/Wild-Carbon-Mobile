import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./MyTabs";
import Register from "../screens/Auth/Register";
import Profil from "../screens/Profil/index";
import useLoginContext from "../src/hooks/useLoginContext";
import Login from "../screens/Auth/Login";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  Profil: undefined;
};

export default function MyStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isLoggedIn } = useLoginContext();
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Tabs" : "Login"}>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : null}
      {!isLoggedIn ? (
        <Stack.Screen name="Register" component={Register} />
      ) : null}
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="Profil" component={Profil} />
    </Stack.Navigator>
  );
}
