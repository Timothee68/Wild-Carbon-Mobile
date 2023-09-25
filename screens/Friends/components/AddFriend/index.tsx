import { Card, Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../../src/gql/UserGql";
import { User, UserProfiles } from "../../../../src/types/UserType";
import { Text } from "react-native";
import AddFriendItem from "../AddFriendItem";

interface AddFriendProps {
  friendsList: User[];
}

const AddFriend: React.FC<AddFriendProps> = ({ friendsList }) => {
  const { data, loading, error } = useQuery<UserProfiles>(GET_ALL_USERS);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    if (data?.getAllUsers) {
      setResults(
        data.getAllUsers.filter(
          (user) =>
            user.pseudo.toLowerCase().includes(search.toLowerCase()) &&
            !friendsList.find(
              (friend) =>
                friend.pseudo.toLowerCase() === user.pseudo.toLowerCase()
            )
        )
      );
    }
  }, [search, data]);

  if (loading) {
    return <Text>Fetching users...</Text>;
  }

  if (error) {
    console.log("error fetch users", error);
    return <Text>Error while fetching users...</Text>;
  }

  return (
    <Card>
      <Card.Title>Ajouter un ami</Card.Title>
      <Card.Divider />
      <Input
        placeholder="Email"
        rightIcon={<Icon name="search" />}
        onChangeText={(text) => setSearch(text)}
      />
      {results.map((user) => (
        <AddFriendItem
          key={user.id}
          id={user.id}
          pseudo={user.pseudo}
          setSearch={setSearch}
        />
      ))}
    </Card>
  );
};

export default AddFriend;
