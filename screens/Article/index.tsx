import React from "react";
import { ScrollView, Text, View, StyleSheet,RefreshControl, SafeAreaView } from "react-native";
import useLoginContext from "../../src/hooks/useLoginContext";
import { useQuery } from "@apollo/client";
import AddArticle from "./components/AddArtcilce";
import UpdateArticle from "./components/UpdateArticle";

import { GET_USER_ARTICLE } from "../../src/gql/UserGql";
import { UserArcticle } from "../../src/types/UserType";
import { Logs } from "expo";
Logs.enableExpoCliLogging();

export default function Article() {

    const [refreshing, setRefreshing] = React.useState(false);
    const { userId , userToken} = useLoginContext();
    // console.log(userToken);

    const { data, loading, error, refetch} =
       useQuery<UserArcticle>(GET_USER_ARTICLE, { variables: { userId: userId } 
    });
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch();
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

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
          }>
            <View style={styles.container}>
                <Text style={styles.title}>Crée ton article,</Text>
                <Text style={styles.title}>pour aider les autres à réduire leurs dépense carbone.</Text>          
                <View style={styles.card}>
                    <Text style={styles.text}>Ajout d'article</Text>
                    <SafeAreaView>
                        <AddArticle
                            userId={userId} 
                            refetch={refetch} 
                            styles={styles}
                        />
                    </SafeAreaView>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Mes articles</Text>
                    <SafeAreaView>
                    {data ? (
                        <UpdateArticle
                            userId={userId} 
                            refetch={refetch} 
                            styles={styles}
                            data={data}
                        />
                        ) : (
                            <Text style={styles.title}>Aucun article</Text>
                        )}
                    </SafeAreaView>
                </View>
            </View>
        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: "center",
        backgroundColor: "#D7CBB5",
    },
    card: {
        margin: 30,
        backgroundColor: "#fff",
        padding: 20,
    },
    text: {
        paddingTop: 20,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
    },
    textError: {
        paddingTop: 20,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
        color: "red",
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
        color: "#3C8962",
        textAlign: "center",
    },
    button: {
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: "#A98E60",
        borderRadius: 10,
        elevation: 2,
        width:200
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: "#A98E60",
    },
    buttonClose: {
        backgroundColor: "#A98E60",
    },
    textStyle: {
        color: "#7ED957",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
  });