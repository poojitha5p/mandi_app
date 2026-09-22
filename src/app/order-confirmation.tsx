import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function OrderConfirmation() {
  const params = useLocalSearchParams();

  // Get values sent from checkout.tsx
  const productName = String(params.name || "Chicken Curry Cut");
  const weight = String(params.weight || "500g");
  const cut = String(params.cut || "Curry Cut");
  const quantity = Number(params.quantity) || 1;
  const total = Number(params.total) || 329;
  const deliverySlot = String(
    params.deliverySlot || "Today, 6 PM - 8 PM"
  );
  const paymentMethod = String(
    params.paymentMethod || "Cash on Delivery"
  );

  // Temporary order ID
  const orderId = "#MAN10234";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* SUCCESS ICON */}
      <View style={styles.checkCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Order Confirmed!</Text>

      <Text style={styles.message}>
        Thank you for your order.
      </Text>

      {/* ORDER DETAILS */}
      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>{orderId}</Text>

        <View style={styles.line} />

        <Text style={styles.label}>Product</Text>
        <Text style={styles.value}>{productName}</Text>

        <Text style={styles.smallText}>
          {weight} • {cut}
        </Text>

        <Text style={styles.smallText}>
          Quantity: {quantity}
        </Text>

        <View style={styles.line} />

        <Text style={styles.label}>Delivery</Text>
        <Text style={styles.value}>{deliverySlot}</Text>

        <View style={styles.line} />

        <Text style={styles.label}>Payment Method</Text>
        <Text style={styles.value}>{paymentMethod}</Text>

        <View style={styles.line} />

        <Text style={styles.label}>Order Total</Text>
        <Text style={styles.price}>₹{total}</Text>
      </View>

      {/* CONTINUE SHOPPING */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.buttonText}>
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
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },

  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  check: {
    fontSize: 45,
    color: "#2E7D32",
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },

  message: {
    color: "#777777",
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 22,
  },

  label: {
    color: "#777777",
    fontSize: 14,
  },

  value: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  smallText: {
    fontSize: 15,
    color: "#777777",
    marginTop: 6,
  },

  line: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 18,
  },

  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#D32F2F",
    padding: 18,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});