import * as React from 'react';
import { StyleSheet , View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {  createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Article from "./screens/Article";
import client  from "./utils/apollo";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <> 
    <ApolloProvider client={client}>

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:string = "";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }
          else if (route.name === "Login") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Article") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          }
          return <Ionicons name={iconName as any } size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        })}
      >

        <Tab.Screen name="Home" component={Home} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Article" component={Article} />
        <Tab.Screen name="Login" component={Login} />

      </Tab.Navigator>
    </NavigationContainer>
    </ApolloProvider>  
</>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
  },
  title: {
      textAlign: "center" ,
      backgroundColor:"#D644DB",
      fontWeight: 'bold',
      fontSize: 15,
  },
});
