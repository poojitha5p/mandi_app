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

  // =====================================================
  // ORDER DETAILS
  // =====================================================

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

  const orderId =
    typeof params.orderId === "string"
      ? params.orderId
      : "#MAN10234";

  // =====================================================
  // TRACK ORDER
  // =====================================================

  const handleTrackOrder = () => {
    router.push({
      pathname: "/track-order",

      params: {
        orderId: orderId,
        name: productName,
        weight: weight,
        cut: cut,
        quantity: quantity,
        total: total,
        slot: slot,
        paymentMethod: paymentMethod,
      },
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BACK BUTTON */}

      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* PAGE TITLE */}

      <Text style={styles.title}>
        My Orders
      </Text>

      {/* ORDER CARD */}

      <View style={styles.orderCard}>
        {/* ORDER HEADER */}

        <View style={styles.topRow}>
          <View style={styles.orderHeaderInfo}>
            <Text style={styles.orderId}>
              {orderId}
            </Text>

            <Text style={styles.date}>
              Placed Today
            </Text>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.status}>
              Confirmed
            </Text>
          </View>
        </View>

        {/* DIVIDER */}

        <View style={styles.divider} />

        {/* PRODUCT */}

        <Text style={styles.productName}>
          {productName}
        </Text>

        <Text style={styles.details}>
          {weight} • {cut}
        </Text>

        <Text style={styles.details}>
          Quantity: {quantity}
        </Text>

        {/* DELIVERY */}

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Delivery
          </Text>

          <Text style={styles.value}>
            Today, {slot}
          </Text>
        </View>

        {/* PAYMENT */}

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Payment
          </Text>

          <Text style={styles.value}>
            {paymentMethod}
          </Text>
        </View>

        {/* TOTAL */}

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Total
          </Text>

          <Text style={styles.total}>
            ₹{total}
          </Text>
        </View>

        {/* TRACK ORDER */}

        <TouchableOpacity
          style={styles.trackButton}
          onPress={handleTrackOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.trackText}>
            Track Order
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTINUE SHOPPING */}

      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => router.replace("/home")}
        activeOpacity={0.8}
      >
        <Text style={styles.shopText}>
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
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
    color: "#111111",
    marginBottom: 25,
  },

  orderCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderHeaderInfo: {
    flex: 1,
    paddingRight: 10,
  },

  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
  },

  date: {
    color: "#777777",
    fontSize: 14,
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
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 18,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
  },

  details: {
    color: "#777777",
    fontSize: 15,
    marginTop: 6,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 18,
  },

  label: {
    color: "#777777",
    fontSize: 15,
    flex: 1,
  },

  value: {
    color: "#111111",
    fontWeight: "600",
    fontSize: 15,
    flex: 2,
    textAlign: "right",
  },

  total: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
    flex: 2,
    textAlign: "right",
  },

  trackButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#D32F2F",
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  trackText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  shopButton: {
    width: "100%",
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    paddingVertical: 18,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  shopText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});