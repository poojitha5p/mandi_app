import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#D32F2F" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  text: {
    marginTop: 12,
    color: "#777777",
    fontSize: 16,
  },
});