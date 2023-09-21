import client  from "./utils/apollo";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyStack from "./screens/MyStack";

const Tab = createBottomTabNavigator();

export default function App() {

	return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
   </ApolloProvider>
	);

}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
