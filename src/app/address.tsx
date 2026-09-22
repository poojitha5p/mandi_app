import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

export default function AddressScreen() {
  const params = useLocalSearchParams();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const saveAddress = () => {
    if (
      !name.trim() ||
      !mobile.trim() ||
      !house.trim() ||
      !area.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      Alert.alert("Missing details", "Please fill all address fields.");
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert("Invalid mobile number", "Enter a 10-digit mobile number.");
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert("Invalid pincode", "Enter a 6-digit pincode.");
      return;
    }

    const fullAddress =
      `${house}, ${area}, ${city} - ${pincode}`;

    router.replace({
      pathname: "/checkout",
      params: {
        ...params,
        customerName: name,
        mobile: mobile,
        address: fullAddress,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Delivery Address</Text>

      <Text style={styles.subtitle}>
        Enter the address where you want your order delivered.
      </Text>

      <Text style={styles.label}>Full Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Mobile Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />

      <Text style={styles.label}>
        House / Flat / Building
      </Text>

      <TextInput
        style={styles.input}
        placeholder="House number, flat or building"
        value={house}
        onChangeText={setHouse}
      />

      <Text style={styles.label}>
        Area / Street / Locality
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter area or street"
        value={area}
        onChangeText={setArea}
      />

      <Text style={styles.label}>City</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Pincode</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit pincode"
        keyboardType="number-pad"
        maxLength={6}
        value={pincode}
        onChangeText={setPincode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveAddress}
      >
        <Text style={styles.buttonText}>
          Save Address
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 25,
  },

  back: {
    color: "#D32F2F",
    fontSize: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    color: "#777777",
    marginTop: 8,
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },

  button: {
    backgroundColor: "#D32F2F",
    paddingVertical: 17,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});