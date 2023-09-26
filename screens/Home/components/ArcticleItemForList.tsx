import { View, Text, StyleSheet } from "react-native";
import ArticleType from "../../../src/types/ArticleType";

export const ArticleItem = ({ article }: { article: ArticleType }) => {
	const { id, title, description, url, createdAt } = article;

	return (
		<View key={id} style={styles.container}>
			<Text style={styles.title}> {title}</Text>
			<Text style={styles.text}> {description}</Text>
			<Text style={styles.url}>{url}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#fff",
		padding: 10,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "#7ED957",
	},
	text: {
		textAlign: "justify",
		fontWeight: "bold",
		fontSize: 15,
		marginBottom: 10,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginBottom: 10,
	},
	url: {
		textAlign: "center",
	},
});
