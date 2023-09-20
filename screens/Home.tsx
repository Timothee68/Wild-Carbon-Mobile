import React from "react";
import { Text, FlatList, Image, View, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../src/gql/UserGql";
import UserType from "../src/types/UserType";
import { Logs } from "expo";

// Logs.enableExpoCliLogging();

export default function Home() {

    const { data, loading , error} = useQuery(GET_ALL_USERS); 
    const UserItem = ({ user }: { user: UserType }) => {
      const { id , pseudo, email } = user;
    
        return (
          <>
          <View>  
            <Text> {id}</Text>
            <Text> {pseudo}</Text>
            <Text> {email}</Text>
          </View>
          </>
        );
      };

      if (error) {
        return <Text>Erreur : {error.message}</Text>;
      }

      if (loading) {
        return <Text>Fetching data...</Text>;
      }

  return (
    <>
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image
        source={require('../assets/logo.png')}
        style={{ width: 350, height: 200 }}
      />
      <Text>Le premier tracker de dépenses carbone 100% gratuit</Text>
      </View>

      <FlatList
        data={data.getAllUsers }
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={( index) => index}
      />
      </ScrollView>
  </> 
  );
}
