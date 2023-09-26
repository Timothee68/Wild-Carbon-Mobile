import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import animation from "../../../assets/leaf-loader.json";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animation}
        style={styles.animation}
        autoPlay
        loop
        resizeMode="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    flex: 1,
  },
});

export default Loader;
