import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Alert, Modal, TouchableOpacity } from "react-native";
import {UPDATE_USER} from "../../../src/gql/UserGql";
import { useMutation } from "@apollo/client";
import UserType from "../../../src/types/UserType";

interface UpdateInfosUser {
    userId: string;
    refetch: () => void;
    styles: any,
    pseudo: string
    setPseudo:React.Dispatch<React.SetStateAction<string>>;
    email:string
    setEmail:React.Dispatch<React.SetStateAction<string>>;
  }

export default function UpdateInfosUser({ userId, refetch , pseudo , setPseudo , email , setEmail , styles }: UpdateInfosUser) {

    const [updateUser] = useMutation(UPDATE_USER, {
        variables: { userId } ,
    });

   const handleUpdateUser = async () => {
    try {
       await updateUser({
        variables: {
          userId: userId, 
          pseudo: pseudo,
          email: email,
        },
      });
      
    Alert.alert( "Mise à jour réussie",
    "Vos informations ont été mises à jour avec succès.");
    refetch();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

   return (
    <>
            <TextInput
            editable
            style={styles.input}
            value={pseudo}
            onChangeText={(text) => setPseudo(text)}
        />
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.button}>
            <Button title="Enregistrer" color="#7ED957" onPress={handleUpdateUser}></Button>
        </View>
    </>
    )
}