import React from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";
import { useQuery } from "@apollo/client";
import { User } from "../../src/types/UserType";
import { GET_ALL_FRIENDS } from "../../src/gql/UserGql";

const Friends: React.FC = () => {
  const {
    data: friendsList,
    error,
    loading,
    refetch: refetchFriendsList,
  } = useQuery<{ getFriends: User[] }>(GET_ALL_FRIENDS);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetchFriendsList();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (error) {
    return <Text>Something broke...</Text>;
  }

  if (loading) {
    return <Text>Fetching data...</Text>;
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
        <AddFriend friendsList={friendsList.getFriends} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
