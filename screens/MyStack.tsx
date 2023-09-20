import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./MyTabs";
import Register from "./Register";

export default function MyStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="Tabs">
			<Stack.Screen
				name="Tabs"
				component={MyTabs}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
}