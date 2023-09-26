import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface FriendListItemProps {
  id: string;
  pseudo: string;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ id, pseudo }) => {
  return (
    <View style={styles.container}>
      <Icon name="person" />
      <Text>{pseudo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start",
  },
});

export default FriendListItem;
