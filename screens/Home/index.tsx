import React from "react";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_ARTICLES } from "../../src/gql/ArticleGql";
import { ArticleItem } from "./components/ArcticleItemForList";

export default function Home() {

    const { data, loading , error} = useQuery(GET_ALL_ARTICLES); 

    if (error) {
      return <Text>Erreur : {error.message}</Text>;
    }

    if (loading) {
      return <Text>Fetching data...</Text>;
    }

  return (
    <>
      <FlatList
        style={styles.flatList}
          ListHeaderComponent={() => (
            <View style={styles.wrapper}>
              <View style={styles.logo}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={{ width: 350, height: 200 }}
                />
                <Text style={styles.intro}>Le premier tracker de dépenses carbone 100% gratuit</Text>
              </View>
            </View>
          )}
        data={data.getAllArticle }
        renderItem={({ item }) => <ArticleItem article={item} />}
        keyExtractor={(item, index) => String(index)}
        nestedScrollEnabled={true}
      />
  </> 
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:"#D7CBB5",
      padding:10,
      marginBottom:20,
      borderWidth:2,
      borderColor:"#3C8962"
  },
  logo: {
    justifyContent: 'flex-start',
    alignItems: 'center' 
  },
  intro: {
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom:40,
    marginTop:-50
  },
  wrapper: {
    padding:10
  },
  flatList: {
    padding:10
  }

});
