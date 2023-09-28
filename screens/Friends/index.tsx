import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";
import { useQuery } from "@apollo/client";
import { UserProfile } from "../../src/types/UserType";
import { GET_USER } from "../../src/gql/UserGql";
import Loader from "../../src/components/Loader";
import useLoginContext from "../../src/hooks/useLoginContext";

const Friends: React.FC = () => {
  const { userId } = useLoginContext();
  const {
    data: friendsList,
    error,
    loading,
    refetch: refetchFriendsList,
  } = useQuery<UserProfile>(GET_USER, { variables: { userId: userId } });

  const [isAnimating, setIsAnimating] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchFriendsList();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  console.log("friends list", friendsList);
  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  if (error) {
    console.log("friends error :", error);
    return <Text>Something broke...</Text>;
  }

  if (loading || isAnimating) {
    return <Loader />;
  }

  if (!friendsList) {
    return <Text>Couldn't fetch friends list...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FriendList friendsList={friendsList.getUser.users} />
        <AddFriend
          friendsList={friendsList.getUser.users}
          refetchFriendsList={refetchFriendsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#D7CBB5",
  },
});

export default Friends;
