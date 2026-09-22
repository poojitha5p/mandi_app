import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
export default function LoginScreen() {
  const [mobile, setMobile] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MANDI</Text>

      <Text style={styles.title}>
        Fresh meat delivered to your door
      </Text>

      <Text style={styles.subtitle}>
        Login or sign up to continue
      </Text>

      <Text style={styles.label}>Mobile Number</Text>

      <View style={styles.phoneBox}>
        <Text style={styles.code}>+91</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />
      </View>

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/otp")}
>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "■#D32F2F",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
  },

  subtitle: {
    textAlign: "center",
    color: "#777777",
    marginTop: 10,
    marginBottom: 40,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  phoneBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
  },

  code: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 15,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#D32F2F",
    padding: 17,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});