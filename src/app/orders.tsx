import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function OrdersScreen() {
  const params = useLocalSearchParams();

  const productName =
    typeof params.name === "string"
      ? params.name
      : "Chicken Curry Cut";

  const weight =
    typeof params.weight === "string"
      ? params.weight
      : "250g";

  const cut =
    typeof params.cut === "string"
      ? params.cut
      : "Curry Cut";

  const quantity =
    typeof params.quantity === "string"
      ? params.quantity
      : "1";

  const total =
    typeof params.total === "string"
      ? params.total
      : "180";

  const slot =
    typeof params.slot === "string"
      ? params.slot
      : "6 PM - 8 PM";

  const paymentMethod =
    typeof params.paymentMethod === "string"
      ? params.paymentMethod
      : "Cash on Delivery";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>My Orders</Text>

      <View style={styles.orderCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.orderId}>#MAN10234</Text>
            <Text style={styles.date}>Placed Today</Text>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.status}>Confirmed</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.productName}>
          {productName}
        </Text>

        <Text style={styles.details}>
          {weight} • {cut}
        </Text>

        <Text style={styles.details}>
          Quantity: {quantity}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Delivery</Text>
          <Text style={styles.value}>
            Today, {slot}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.value}>
            {paymentMethod}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => {}}
        >
          <Text style={styles.trackText}>
            Track Order
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.shopText}>
          Continue Shopping
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
    padding: 20,
    paddingBottom: 50,
  },

  back: {
    color: "#D32F2F",
    fontSize: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  orderCard: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },

  date: {
    color: "#777777",
    marginTop: 5,
  },

  statusBox: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  status: {
    color: "#2E7D32",
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 18,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  details: {
    color: "#777777",
    marginTop: 6,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  label: {
    color: "#777777",
  },

  value: {
    fontWeight: "600",
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
  },

  trackButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
  },

  trackText: {
    color: "#D32F2F",
    textAlign: "center",
    fontWeight: "bold",
  },

  shopButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    padding: 18,
    marginTop: 25,
  },

  shopText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});