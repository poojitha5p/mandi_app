import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function OTPScreen() {
  const [otp, setOtp] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MANDI</Text>

      <Text style={styles.title}>Verify OTP</Text>

      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your mobile number
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="------"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.resend}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
  },

  subtitle: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  otpInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    height: 60,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 10,
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

  resend: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
  },
});