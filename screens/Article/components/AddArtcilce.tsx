import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, TextInput, Button, Alert, Modal } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_ARTICLE } from "../../../src/gql/ArticleGql";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AddArticle {
    userId: string;
    refetch: () => void;
    styles: any;
  }

export default function AddArticle({userId, refetch, styles } : AddArticle) {
    const [modalVisible, setModalVisible] = useState(false);
    const [createArticle] = useMutation(CREATE_ARTICLE);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const handleAddArticle = async () => {
        try {
            await createArticle({
                variables: {
                    userId: userId,
                    title: title,
                    description: description,
                    url: url,
                }
            });

            setModalVisible(false); 
            refetch();
            Alert.alert( "Article ajouter avec succès");

        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de l'ajout de l'article. Veuillez réessayer plus tard.");
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Ajout article</Text>
                        <View style={{  alignItems: "center" }}>
                            <TextInput
                                editable
                                style={{ ...styles.input, width: 300 }}
                                value={title}
                                placeholder="Titre de l'article"
                                onChangeText={(text) => setTitle(text)}
                            />
                            <TextInput
                                editable
                                style={{ ...styles.input, width: 300 }}
                                value={description}
                                placeholder="Courte description du contenu"
                                onChangeText={(text) => setDescription(text)}
                            />
                            <TextInput
                                editable
                                style={{ ...styles.input, width: 300 }}
                                value={url}
                                placeholder="L'url ou lien de l'article"
                                onChangeText={(text) => setUrl(text)}
                            />
                            <View style={styles.button}>
                                <Button title="Enregistrer" color="#7ED957" onPress={handleAddArticle}/>
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
                </View>
            </Modal>
                <View style={styles.button}>
                    <Button
                    title="Ajouter"
                    color="#7ED957"
                    onPress={() => setModalVisible(true)}
                />
            </View>
        </View>
    )
}