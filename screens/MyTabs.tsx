import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
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
				headerStyle: {
					backgroundColor: "#D7CBB5",
				},
				headerTitle: () => (
					<Image
						source={require("./assets/leaf.png")}
						style={styles.logoCentral}
					/>
				),
				headerTitleAlign: "center",
				headerRight: () => (
					<TouchableOpacity
						onPress={() => {
							// Naviguez vers l'écran de profil ici
						}}
						style={styles.logoProfil}
					>
						<Ionicons
							size={30}
							color={"#3C8962"}
							name="person-sharp"
						></Ionicons>
					</TouchableOpacity>
				),
				tabBarActiveTintColor: "blue",
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		backgroundColor: "#D644DB",
		fontWeight: "bold",
		fontSize: 15,
	},
	logoHeader: {
		width: 40,
		height: 40,
		marginLeft: 20,
	},
	logoProfil: {
		marginRight: 20,
	},
	logoCentral: {
		width: 90,
		height: 60,
		marginBottom: 15,
	},
});
