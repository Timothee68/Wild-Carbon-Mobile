import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ArticleType from "../../../src/types/ArticleType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import ModalArticleUpdate from "./ModalArticleUpdate";
import { Logs } from "expo";
import { useMutation } from "@apollo/client";
import { DELETE_ARTICLE } from "../../../src/gql/ArticleGql";
Logs.enableExpoCliLogging();
interface ArticleItem {
    userId: string;
    refetch: () => void;
    article: ArticleType
  }

export const ArticleItem = ({article ,userId , refetch} : ArticleItem) => {
 
    const { id, title, description, url } = article;

    const [deleteArcicle] = useMutation(DELETE_ARTICLE, {
        variables: {id},
    })

    const handleDeleteArticle = async () => {
        try {
            await deleteArcicle({
                variables: {
                    id: id
                }
            });
            refetch()
            Alert.alert( "Suppression réussie",
            "Votre article a été supprimé avec succès.");

        } catch (error) {
            console.error('Erreur lors de la supression de l\'article :', error);
            Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    }

  return (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.url}>{url}</Text>
        <View>
            <View style={styles.containerButton}>
                
                <TouchableOpacity
                >
                    <ModalArticleUpdate article={article} userId={userId} refetch={refetch} />   
                </TouchableOpacity>
                <TouchableOpacity>
                <Text  style={styles.icon}>
                    <Ionicons size={30} name="trash-bin-outline" color="red" onPress={handleDeleteArticle}/>
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        margin: 20,
        backgroundColor: "#fff",
        padding: 20,
        width:280,
        borderWidth: 2,
        borderColor: "#3C8962",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
      },
    text: {
        textAlign: "justify",
        fontSize: 15,
        marginBottom: 10,
    },
    url: {
        textAlign: "center",
        color:"blue"
    },
    containerButton: {
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:20
    },
    icon: {
        marginTop:20
    }

});