import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { useMutation } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UPDATE_ARTICLE } from "../../../src/gql/ArticleGql";
import ArticleType from "../../../src/types/ArticleType";

interface ModalArticleUpdate {
  userId: string;
  refetch: () => void;
  
  article: ArticleType
}

export default function ModalArticleUpdate({
  userId,
  refetch,
  article
}: ModalArticleUpdate) {

    const { id } = article;
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

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
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Modification du mot de passe</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Title"
                style={{ ...styles.input, width: 300 }}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
               multiline={true}
               numberOfLines={40}
                placeholder="Description"
                style={{ ...styles.input, width: 300 }}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Url"
                style={{ ...styles.input, width: 300 }}
                value={url}
                onChangeText={(text) => setUrl(text)}
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Enregistrer"
                color="#7ED957"
                onPress={handleUpdateArticle}
              />
            </View>
            <View style={{ ...styles.button, marginTop: 30 }}>
              <Button
                title="X"
                color="#7ED957"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Text>
            <Ionicons size={30} color="blue" name="pencil-outline"  onPress={() => setModalVisible(true)}/>
        </Text>
      </View>
    </View>
  );
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