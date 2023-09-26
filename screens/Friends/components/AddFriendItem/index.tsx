import { useMutation } from "@apollo/client";
import { Icon } from "@rneui/themed";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ADD_FRIEND } from "../../../../src/gql/UserGql";
import useLoginContext from "../../../../src/hooks/useLoginContext";

interface AddFriendItemProps {
  id: string;
  pseudo: string;
  setSearch: Dispatch<SetStateAction<string>>;
  refetchFriendsList: () => {};
}

const AddFriendItem: React.FC<AddFriendItemProps> = ({
  id,
  pseudo,
  setSearch,
  refetchFriendsList,
}) => {
  const [addFriend, { loading, error }] = useMutation(ADD_FRIEND);
  const { userId } = useLoginContext();

  const handleAddFriend = async () => {
    await addFriend({ variables: { userId: userId, userIdToAdd: id } });
    setSearch("");
    refetchFriendsList();
  };

  if (loading) {
    return <Text>Adding friend...</Text>;
  }

  if (error) {
    return <Text>Problem while adding friend...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Icon name="person" />
        <Text>{pseudo}</Text>
      </View>
      <TouchableOpacity onPress={handleAddFriend}>
        <Icon name="add" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default AddFriendItem;
