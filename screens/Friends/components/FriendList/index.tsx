import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_FRIENDS } from "../../../../src/gql/UserGql";
import { Text } from "react-native";
import { Card } from "@rneui/base";
import FriendListItem from "../FriendListItem";
import { User } from "../../../../src/types/UserType";

interface FriendListProps {
  friendsList: User[];
}

const FriendList: React.FC<FriendListProps> = ({ friendsList }) => {
  return (
    <Card>
      <Card.Title>Mes amis pollueurs</Card.Title>
      <Card.Divider />
      {friendsList
        ? friendsList.map(({ id, pseudo }) => (
            <FriendListItem key={id} id={id} pseudo={pseudo} />
          ))
        : null}
    </Card>
  );
};

export default FriendList;
