import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, TextInput, Button, ScrollView, RefreshControl, Alert, Modal, TouchableOpacity, Pressable } from "react-native";
import {GET_USER , UPDATE_USER , DELETE_USER} from "../../src/gql/UserGql";
import { useMutation, useQuery } from "@apollo/client";
import UserType from "../../src/types/UserType";
import { Logs } from 'expo';
import Ionicons from "@expo/vector-icons/Ionicons";

Logs.enableExpoCliLogging();

export default function Profil({ navigation }: { navigation: any }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

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

    const [updateUser] = useMutation(UPDATE_USER, {
       variables: { userId } ,
      });

    const [deleteUser] = useMutation(DELETE_USER, {
      variables: { userId }, 
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
      
      const handleUpdatePasswordUser = async () => {
        try {

          if (password !== ConfirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
          }

           await updateUser({
            variables: {
              userId: userId, 
              password: password
            },
          });
          
        setModalVisible(false);    
        setPasswordError("");
        refetch();
        Alert.alert( "Mise à jour réussie",
        "Vos informations ont été mises à jour avec succès.");

        } catch (error) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer plus tard.");
        }
      };

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
                  </SafeAreaView>   
              </View>
                  {/* MODAL UPDATE PASSWORD */}
              <View style={styles.card}>
                <Text style={styles.text}>Mot de passe</Text>
                <SafeAreaView>
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
                          <Text style={styles.text}>Modification du mot de passe</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                placeholder="Mot de passe actuelle"
                                style={{...styles.input, width:300}}
                                secureTextEntry={!isPasswordVisible}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                            <Text><Ionicons size={25} name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}></Ionicons></Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <TextInput
                                  placeholder="Confirme mot de passe"
                                  style={{...styles.input, width:300}}
                                  secureTextEntry={!isConfirmPasswordVisible}
                                  value={ConfirmPassword}
                                  onChangeText={(text) => setConfirmPassword(text)}
                              />
                              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                              <Text><Ionicons size={25} name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}></Ionicons></Text>
                              </TouchableOpacity>
                          </View>
                          {passwordError ? (
                          <Text style={styles.textError}>{passwordError}</Text>
                            ) : null}
                          <View style={styles.button}>
                              <Button title="Enregistrer" color="#7ED957" onPress={handleUpdatePasswordUser}></Button>
                          </View>
                          <View style={{ ...styles.button, marginTop: 30 }}>
                              <Button  title="Close Update mot de passe" color="#7ED957" onPress={() => setModalVisible(!modalVisible)}></Button>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <View style={styles.button}>
                      <Button  title="Modifier mot de passe" color="#7ED957"  onPress={() => setModalVisible(true)}></Button>
                    </View>
                  </View>
                </SafeAreaView>   
              </View>
              {/* MODAL DELETE */}
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
              {/* FIN MODAL */}
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