import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "@rneui/base";
import FriendListItem from "../FriendListItem";
import { User } from "../../../../src/types/UserType";

interface FriendListProps {
	friendsList: User[];
}

const FriendList: React.FC<FriendListProps> = ({ friendsList }) => {
	return (
		<Card>
			<Card.Title style={styles.title}>Mes amis pollueurs</Card.Title>
			<Card.Divider />
			{friendsList
				? friendsList.map(({ id, pseudo }) => (
						<FriendListItem key={id} id={id} pseudo={pseudo} />
				  ))
				: null}
		</Card>
	);
};

const styles = StyleSheet.create({
	title: {
		color: "#7ED957",
	},
});

export default FriendList;
