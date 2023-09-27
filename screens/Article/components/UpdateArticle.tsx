import React from "react";
import { FlatList } from "react-native";
import { UserArcticle } from "../../../src/types/UserType";
import { ArticleItem } from "./ArticleItem";

interface UpdateArticle {
    userId: string;
    refetch: () => void;
    styles: any;
    data: UserArcticle
  }

export default function UpdateArticle({userId, refetch, styles , data} : UpdateArticle) {
  
    return (
        <FlatList
            horizontal
            data={data.getUser.articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
             <ArticleItem article={item} userId={userId} refetch={refetch}/>
            }
        />
    )
}