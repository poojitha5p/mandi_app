import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function OTPScreen() {
  const params = useLocalSearchParams();

  // Phone number received from login page
  const phone = String(params.phone || "");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =====================================================
  // OTP INPUT
  // =====================================================

  const handleOtpChange = (value: string) => {
    // Allow only numbers
    const numbersOnly = value.replace(/[^0-9]/g, "");

    setOtp(numbersOnly);
    setError("");
    setMessage("");
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp = () => {
    setError("");
    setMessage("");

    // No OTP entered
    if (otp.length === 0) {
      setError("Please enter the OTP.");
      return;
    }

    // Less than 6 digits
    if (otp.length < 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    // Safety check
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    // ==================================================
    // TEMPORARY LOGIN
    // ==================================================
    // Any 6-digit OTP will work for development/testing.
    //
    // IMPORTANT:
    // Replace this with backend OTP verification later.
    // ==================================================

    router.replace("/home");
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOtp = () => {
    setError("");
    setMessage("");
    setOtp("");

    // If phone number was not received
    if (!phone) {
      setMessage(
        "OTP service will be available after backend connection."
      );
      return;
    }

    // Temporary message
    setMessage(
      "OTP resend will work after backend connection."
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* LOGO */}

        <Text style={styles.logo}>
          MANDI
        </Text>

        {/* TITLE */}

        <Text style={styles.title}>
          Verify OTP
        </Text>

        {/* SUBTITLE */}

        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your mobile number
        </Text>

        {/* PHONE NUMBER */}

        {phone !== "" && (
          <Text style={styles.phone}>
            +91 {phone}
          </Text>
        )}

        {/* OTP INPUT */}

        <TextInput
          style={[
            styles.otpInput,
            error !== "" && styles.errorBorder,
          ]}
          placeholder="------"
          placeholderTextColor="#BBBBBB"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={handleOtpChange}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
        />

        {/* DIGIT COUNTER */}

        <Text style={styles.counter}>
          {otp.length}/6 digits
        </Text>

        {/* ERROR MESSAGE */}

        {error !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* INFORMATION MESSAGE */}

        {message !== "" && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              {message}
            </Text>
          </View>
        )}

        {/* VERIFY BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOtp}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Verify OTP
          </Text>
        </TouchableOpacity>

        {/* RESEND OTP */}

        <TouchableOpacity
          onPress={handleResendOtp}
          activeOpacity={0.7}
        >
          <Text style={styles.resend}>
            Resend OTP
          </Text>
        </TouchableOpacity>

        {/* CHANGE NUMBER */}

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.changeNumber}>
            Change Mobile Number
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // Prevent form stretching across desktop
  card: {
    width: "100%",
    maxWidth: 450,
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
    lineHeight: 22,
  },

  phone: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginTop: 12,
  },

  otpInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    height: 60,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 10,
    marginTop: 30,
    color: "#222222",
    backgroundColor: "#FFFFFF",
  },

  errorBorder: {
    borderColor: "#D32F2F",
  },

  counter: {
    textAlign: "right",
    color: "#888888",
    fontSize: 12,
    marginTop: 6,
  },

  errorBox: {
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },

  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  messageBox: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },

  messageText: {
    color: "#2E7D32",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  button: {
    width: "100%",
    backgroundColor: "#D32F2F",
    paddingVertical: 17,
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

  changeNumber: {
    color: "#666666",
    textAlign: "center",
    fontSize: 14,
    marginTop: 18,
  },
});