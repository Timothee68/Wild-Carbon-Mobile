import React, {  useState } from "react";
import { Text, StyleSheet, View, Button, Alert, Modal } from "react-native";
import { DELETE_USER } from "../../../src/gql/UserGql";
import { useMutation } from "@apollo/client";
import { useNavigation } from '@react-navigation/native';

interface ModalDeleteUser {
  userId: string;
  styles: any
}

export default function ModalDeleteUser({userId, styles } : ModalDeleteUser, {  navigation}: {navigation: any}  ) {

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const [deleteUser] = useMutation(DELETE_USER, {
        variables: { userId }, 
      });

    const handleDeleteUser = async () => {
    try {
        await deleteUser({
        variables: {
            userId: userId, 
        },
        });
        console.log(userId)
        Alert.alert( "Suppression réussie",
        "Vos informations ont été supprimée avec succès.");
        setModalDeleteVisible(false); 

        navigation.navigate("Register");

    } catch (error) {
            console.error('Erreur lors de la supression de l\'utilisateur :', error);
        Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer plus tard.");
    }
    }

    return (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDeleteVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          setModalDeleteVisible(!modalDeleteVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text}>Etes Vous sûr ?</Text>
              <Text>La suppression est définitive.</Text>
              <View style={{ marginTop: 30 }}>
                <Button title="Supprimer mon compte" color="red" onPress={handleDeleteUser}/>
              </View>
              <View style={{ ...styles.button, marginTop: 30 }}>
                <Button  title="Close" color="#7ED957" onPress={() => setModalDeleteVisible(!modalDeleteVisible)}/>
              </View>
            </View>
          </View>
        </Modal>
        <Button title="Supprimer mon compte" color="red" onPress={() => setModalDeleteVisible(true)}/>
      </View>
    );
}

const styles = StyleSheet.create({ 
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
  text: {
    paddingTop:20,
    textAlign: "center" ,   
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:10
},
button: {
  marginLeft:50,
  marginRight:50,
  backgroundColor:"#A98E60",
  borderRadius: 10,
  elevation: 2,
},
})