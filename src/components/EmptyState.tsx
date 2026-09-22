import { StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "Nothing here yet",
  message = "No items are available.",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 15,
  },
  message: {
    color: "#777777",
    textAlign: "center",
    marginTop: 7,
  },
});