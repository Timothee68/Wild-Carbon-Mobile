import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import {GET_USER} from "../../src/gql/UserGql";
import { useQuery } from "@apollo/client";
import UserType from "../../src/types/UserType";
import { Logs } from 'expo';
import ModalDeleteUser from "./components/ModalDeleteUser";
import ModalUpdatePasswordUser from "./components/ModalUpdatePassword";
import UpdateInfosUser from "./components/UpdateInfosUser";
Logs.enableExpoCliLogging();

export default function Profil() {

    const [refreshing, setRefreshing] = React.useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      refetch();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const userId = 'a4075c11-6e63-4877-afea-a9ec8cb9da71'; 
    const { data, loading, error, refetch } = useQuery(GET_USER , {
      variables: { userId }, 
    });

    useEffect( () => {
      if(data?.getUser){
        const user = data.getUser as UserType;
        setPseudo(user.pseudo);
        setEmail(user.email);
        setPassword(user.password);
      }
    }, [data])      

    if (error) {
        return <Text>Erreur : {error.message}</Text>;
    }
  
    if (loading) { 
      return <Text>Fetching data...</Text>;
    }
    return (
      <>
        <ScrollView  
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            <Text style={styles.title}>Mon profil</Text>
              <View style={styles.card}>
                <Text style={styles.text}>Informations Personelles</Text>
                  <SafeAreaView>
                      <UpdateInfosUser userId={userId}  refetch={refetch} styles={styles} pseudo={pseudo} setPseudo={setPseudo} email={email} setEmail={setEmail}></UpdateInfosUser>
                  </SafeAreaView>   
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>Mot de passe</Text>
                <SafeAreaView>
                  <ModalUpdatePasswordUser userId={userId} refetch={refetch} styles={styles}  password={password} setPassword={setPassword}></ModalUpdatePasswordUser>
                </SafeAreaView>   
              </View>
                <ModalDeleteUser userId={userId} styles={styles} ></ModalDeleteUser>
          </View>
        </ScrollView>
      </>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 0.5,
        justifyContent: "center",
    },
    card: {
        marginTop:50,
        backgroundColor:"#D7CBB5",
        padding:20,
    },
    text: {
        paddingTop:20,
        textAlign: "center" ,   
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom:10
    },
    textError: {
      paddingTop:20,
      textAlign: "center" ,   
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom:10,
      color:"red"
  },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
		borderColor: "#7ED957",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
      },
      title: {
        fontSize: 35,
        color:"#3C8962"
      },
      button: {
        marginLeft:50,
        marginRight:50,
        backgroundColor:"#A98E60",
        borderRadius: 10,
        elevation: 2,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonOpen: {
        backgroundColor: '#A98E60',
      },
      buttonClose: {
        backgroundColor: '#A98E60',
      },
      textStyle: {
        color: '#7ED957',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})