import { router, useLocalSearchParams } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DeliverySlotScreen() {
  const params = useLocalSearchParams();

  const slots = [
    "10 AM - 12 PM",
    "12 PM - 2 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
    "6 PM - 8 PM",
    "8 PM - 10 PM",
  ];

  const selectSlot = (selectedSlot: string) => {
    router.replace({
      pathname: "/checkout",
      params: {
        ...params,

        // selected delivery slot
        slot: selectedSlot,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* BACK */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>Select Delivery Slot</Text>

      <Text style={styles.subtitle}>Today</Text>

      {/* DELIVERY SLOTS */}
      {slots.map((slot) => (
        <TouchableOpacity
          key={slot}
          style={styles.slot}
          onPress={() => selectSlot(slot)}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.slotText}>{slot}</Text>

            <Text style={styles.available}>
              Available
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  backButton: {
    alignSelf: "flex-start",
  },

  back: {
    color: "#D32F2F",
    fontSize: 16,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  slot: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  slotText: {
    fontSize: 16,
    fontWeight: "600",
  },

  available: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },

  arrow: {
    fontSize: 28,
    color: "#D32F2F",
  },
});