import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import ArticleType from "../../../src/types/ArticleType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { UPDATE_ARTICLE } from "../../../src/gql/ArticleGql";

interface ArticleItem {
    userId: string;
    refetch: () => void;
    article: ArticleType
  }

export const ArticleItem = ({article ,userId , refetch} : ArticleItem) => {
 
    const { id, title, description, url, createdAt } = article;

    const [UpdateArticle]  = useMutation(UPDATE_ARTICLE, {
        variables: {id}
    })

  const handleUpdateArticle = async () => {
      try {         
        await UpdateArticle({
          variables: {
            userId: userId,
            title: title,
            description: description,
            url: url,
          },
        });

      refetch();
      Alert.alert(
          "Mise à jour réussie",
          "Vos informations ont été mises à jour avec succès."
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'article :", error);
        Alert.alert(
          "Erreur",
          "Une erreur est survenue. Veuillez réessayer plus tard."
        );
      }
    };

  return (
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.url}>{url}</Text>
        <View>
        <TouchableOpacity
            onPress={() => handleUpdateArticle()}
        >
            <View style={styles.containerButton}>
                <Text>
                    <Ionicons size={30} color="blue" name="pencil-outline"/>
                </Text>
                <Text>
                    <Ionicons size={30} name="trash-bin-outline" color="red"/>
                </Text>
            </View>
        </TouchableOpacity>
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