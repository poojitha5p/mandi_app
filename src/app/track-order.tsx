import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TrackOrderScreen() {
  const params = useLocalSearchParams();

  const productName =
    typeof params.name === "string"
      ? params.name
      : "Chicken Curry Cut";

  const slot =
    typeof params.slot === "string"
      ? params.slot
      : "6 PM - 8 PM";

  const orderId =
    typeof params.orderId === "string"
      ? params.orderId
      : "#MAN10234";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* BACK */}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}

      <Text style={styles.title}>Track Order</Text>

      {/* ORDER INFORMATION */}

      <View style={styles.orderCard}>
        <Text style={styles.label}>Order ID</Text>

        <Text style={styles.orderId}>{orderId}</Text>

        <View style={styles.divider} />

        <Text style={styles.product}>{productName}</Text>

        <Text style={styles.delivery}>
          Expected Delivery: Today, {slot}
        </Text>
      </View>

      {/* ORDER STATUS */}

      <Text style={styles.sectionTitle}>Order Status</Text>

      <View style={styles.timeline}>
        {/* CONFIRMED */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.completedCircle}>
              <Text style={styles.check}>✓</Text>
            </View>

            <View style={styles.completedLine} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.completedTitle}>
              Order Confirmed
            </Text>

            <Text style={styles.statusDescription}>
              Your order has been confirmed.
            </Text>
          </View>
        </View>

        {/* PREPARING */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.activeCircle}>
              <View style={styles.innerCircle} />
            </View>

            <View style={styles.pendingLine} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.activeTitle}>
              Preparing Your Order
            </Text>

            <Text style={styles.statusDescription}>
              Your fresh meat is being prepared and packed.
            </Text>
          </View>
        </View>

        {/* OUT FOR DELIVERY */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.pendingCircle} />

            <View style={styles.pendingLine} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.pendingTitle}>
              Out for Delivery
            </Text>

            <Text style={styles.statusDescription}>
              Your order will be picked up for delivery.
            </Text>
          </View>
        </View>

        {/* DELIVERED */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.pendingCircle} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.pendingTitle}>
              Delivered
            </Text>

            <Text style={styles.statusDescription}>
              Order delivered successfully.
            </Text>
          </View>
        </View>
      </View>

      {/* HOME BUTTON */}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.homeText}>
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
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 15,
  },

  label: {
    color: "#777777",
    fontSize: 14,
  },

  orderId: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 17,
  },

  product: {
    fontSize: 18,
    fontWeight: "bold",
  },

  delivery: {
    color: "#777777",
    marginTop: 7,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 25,
  },

  timeline: {
    paddingHorizontal: 5,
  },

  statusRow: {
    flexDirection: "row",
    minHeight: 105,
  },

  left: {
    width: 45,
    alignItems: "center",
  },

  completedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },

  check: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },

  activeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#D32F2F",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D32F2F",
  },

  pendingCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },

  completedLine: {
    width: 3,
    flex: 1,
    backgroundColor: "#2E7D32",
  },

  pendingLine: {
    width: 3,
    flex: 1,
    backgroundColor: "#DDDDDD",
  },

  statusContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 25,
  },

  completedTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  activeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#D32F2F",
  },

  pendingTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#777777",
  },

  statusDescription: {
    color: "#777777",
    marginTop: 6,
    lineHeight: 20,
  },

  homeButton: {
    backgroundColor: "#D32F2F",
    padding: 18,
    borderRadius: 10,
    marginTop: 20,
  },

  homeText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});