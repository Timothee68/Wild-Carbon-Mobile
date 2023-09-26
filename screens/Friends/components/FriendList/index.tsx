import React from "react";
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
