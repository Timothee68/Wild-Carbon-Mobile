import React from "react";
import { Text, View, Pressable } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../src/gql/UserGql";
import UserType from "../src/types/UserType";
import { GET_ALL_CATEGORIES } from "../src/gql/CategorieGql";
import Category from "../src/types/CategoryType";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);

  if (loading) {
    return <Text>Chargement en cours...</Text>;
  }

  if (error) {
    return <Text>Erreur : {error.message}  {data} </Text>;;
   
  }

  const categories = data.getAllCategory;

  return (
    <View>
      <Text>Liste des catégories :</Text>
      {categories.map((category : Category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
}


