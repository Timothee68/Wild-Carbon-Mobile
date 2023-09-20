import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Article from "./Article";
import Login from "./Login";
import Home from "./Home";

const Tab = createBottomTabNavigator();
export default function MyTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: string = "";
					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Login") {
						iconName = focused ? "person-circle" : "person-circle-outline";
					} else if (route.name === "Article") {
						iconName = focused ? "newspaper" : "newspaper-outline";
					}
					return <Ionicons name={iconName as any} size={size} color={color} />;
				},
				tabBarActiveTintColor: "#7ED957",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ unmountOnBlur: true }}
			/>
			<Tab.Screen name="Article" component={Article} />
			<Tab.Screen name="Login" component={Login} />
		</Tab.Navigator>
	);
}
