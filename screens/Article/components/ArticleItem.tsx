import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ArticleType from "../../../src/types/ArticleType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import ModalArticleUpdate from "./ModalArticleUpdate";

interface ArticleItem {
    userId: string;
    refetch: () => void;
    article: ArticleType
  }

export const ArticleItem = ({article ,userId , refetch} : ArticleItem) => {
 
    const { id, title, description, url, createdAt } = article;
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.url}>{url}</Text>
        <View>
            <View style={styles.containerButton}>
                
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    <ModalArticleUpdate article={article} userId={userId} refetch={refetch} />   
                </TouchableOpacity>

                <TouchableOpacity>
                <Text>
                    <Ionicons size={30} name="trash-bin-outline" color="red"/>
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

});