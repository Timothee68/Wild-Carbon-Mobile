import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";
import { useQuery } from "@apollo/client";
import { User } from "../../src/types/UserType";
import { GET_ALL_FRIENDS } from "../../src/gql/UserGql";
import Loader from "../../src/components/Loader";

const Friends: React.FC = () => {
  const {
    data: friendsList,
    error,
    loading,
    refetch: refetchFriendsList,
  } = useQuery<{ getFriends: User[] }>(GET_ALL_FRIENDS, {
    fetchPolicy: "network-only",
  });
  const [isAnimating, setIsAnimating] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchFriendsList();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  if (error) {
    return <Text>Something broke...</Text>;
  }

  if (loading || isAnimating) {
    return <Loader />;
  }

  if (!friendsList) {
    return <Text>Couldn't fetch friends list...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FriendList friendsList={friendsList.getFriends} />
        <AddFriend
          friendsList={friendsList.getFriends}
          refetchFriendsList={refetchFriendsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
