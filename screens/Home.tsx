import React from "react";
import { Text, FlatList, Image, View, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_ARTICLES } from "../src/gql/ArticleGql";
import ArticleType from "../src/types/ArticleType";
// Logs.enableExpoCliLogging();

export default function Home() {

    const { data, loading , error} = useQuery(GET_ALL_ARTICLES); 
    const ArticleItem = ({ article }: { article: ArticleType }) => {
      const { id, title, description  } = article;
    
        return (
          <>
          <View>  
            <Text> {id}</Text>
            <Text> {title}</Text>
            <Text> {description}</Text>
          </View>
          </>
        );
      };

      if (error) {
        return <Text>Erreur : {error.message}</Text>;
      }

      if (loading) {
        return <Text>Fetching data...</Text>;
      }

  return (
    <>
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image
        source={require('../assets/logo.png')}
        style={{ width: 350, height: 200 }}
      />
      <Text>Le premier tracker de dépenses carbone 100% gratuit</Text>
      </View>

      <FlatList
        data={data.getAllArticle }
        renderItem={({ item }) => <ArticleItem article={item} />}
        keyExtractor={( index) => index}
      />
      </ScrollView>
  </> 
  );
}
