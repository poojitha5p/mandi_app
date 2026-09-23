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

  // =====================================================
  // GET ORDER DETAILS
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
  // UI
  // =====================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BACK */}

      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}

      <Text style={styles.title}>
        Track Order
      </Text>

      {/* ORDER INFORMATION CARD */}

      <View style={styles.orderCard}>
        <View style={styles.orderTopRow}>
          <View>
            <Text style={styles.label}>
              Order ID
            </Text>

            <Text style={styles.orderId}>
              {orderId}
            </Text>
          </View>

          <View style={styles.confirmedBadge}>
            <Text style={styles.confirmedText}>
              Confirmed
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* PRODUCT */}

        <Text style={styles.product}>
          {productName}
        </Text>

        <Text style={styles.productDetails}>
          {weight} • {cut}
        </Text>

        <Text style={styles.productDetails}>
          Quantity: {quantity}
        </Text>

        {/* DELIVERY */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Delivery
          </Text>

          <Text style={styles.infoValue}>
            Today, {slot}
          </Text>
        </View>

        {/* PAYMENT */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Payment
          </Text>

          <Text style={styles.infoValue}>
            {paymentMethod}
          </Text>
        </View>

        {/* TOTAL */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Total
          </Text>

          <Text style={styles.total}>
            ₹{total}
          </Text>
        </View>
      </View>

      {/* EXPECTED DELIVERY */}

      <View style={styles.deliveryBox}>
        <Text style={styles.deliveryTitle}>
          Expected Delivery
        </Text>

        <Text style={styles.deliveryTime}>
          Today, {slot}
        </Text>
      </View>

      {/* ORDER STATUS */}

      <Text style={styles.sectionTitle}>
        Order Status
      </Text>

      <View style={styles.timeline}>
        {/* ============================================= */}
        {/* ORDER CONFIRMED */}
        {/* ============================================= */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.completedCircle}>
              <Text style={styles.check}>
                ✓
              </Text>
            </View>

            <View style={styles.completedLine} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.completedTitle}>
              Order Confirmed
            </Text>

            <Text style={styles.statusDescription}>
              Your order has been confirmed successfully.
            </Text>
          </View>
        </View>

        {/* ============================================= */}
        {/* PREPARING ORDER */}
        {/* ============================================= */}

        <View style={styles.statusRow}>
          <View style={styles.left}>
            <View style={styles.activeCircle}>
              <View style={styles.innerCircle} />
            </View>

            <View style={styles.pendingLine} />
          </View>

          <View style={styles.statusContent}>
            <View style={styles.activeTitleRow}>
              <Text style={styles.activeTitle}>
                Preparing Your Order
              </Text>

              <View style={styles.currentBadge}>
                <Text style={styles.currentText}>
                  Current
                </Text>
              </View>
            </View>

            <Text style={styles.statusDescription}>
              Your fresh meat is being prepared and packed.
            </Text>
          </View>
        </View>

        {/* ============================================= */}
        {/* OUT FOR DELIVERY */}
        {/* ============================================= */}

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
              Your order will be picked up by our delivery partner.
            </Text>
          </View>
        </View>

        {/* ============================================= */}
        {/* DELIVERED */}
        {/* ============================================= */}

        <View style={styles.lastStatusRow}>
          <View style={styles.left}>
            <View style={styles.pendingCircle} />
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.pendingTitle}>
              Delivered
            </Text>

            <Text style={styles.statusDescription}>
              Your order will be marked as delivered after delivery.
            </Text>
          </View>
        </View>
      </View>

      {/* NOTE */}

      {/* CONTINUE SHOPPING */}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace("/home")}
        activeOpacity={0.8}
      >
        <Text style={styles.homeText}>
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

  // =====================================================
  // HEADER
  // =====================================================

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

  // =====================================================
  // ORDER CARD
  // =====================================================

  orderCard: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 15,
  },

  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: "#777777",
    fontSize: 14,
  },

  orderId: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111111",
    marginTop: 5,
  },

  confirmedBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  confirmedText: {
    color: "#2E7D32",
    fontSize: 13,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 17,
  },

  product: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
  },

  productDetails: {
    color: "#777777",
    fontSize: 14,
    marginTop: 6,
  },

  // =====================================================
  // ORDER INFO
  // =====================================================

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 17,
  },

  infoLabel: {
    color: "#777777",
    fontSize: 14,
    flex: 1,
  },

  infoValue: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
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

  // =====================================================
  // DELIVERY BOX
  // =====================================================

  deliveryBox: {
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    padding: 17,
    marginTop: 20,
  },

  deliveryTitle: {
    color: "#777777",
    fontSize: 13,
  },

  deliveryTime: {
    color: "#D32F2F",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  // =====================================================
  // ORDER STATUS
  // =====================================================

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111111",
    marginTop: 30,
    marginBottom: 25,
  },

  timeline: {
    width: "100%",
    paddingHorizontal: 5,
  },

  statusRow: {
    flexDirection: "row",
    minHeight: 110,
  },

  lastStatusRow: {
    flexDirection: "row",
    minHeight: 80,
  },

  left: {
    width: 45,
    alignItems: "center",
  },

  statusContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 25,
  },

  // =====================================================
  // COMPLETED
  // =====================================================

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

  completedLine: {
    width: 3,
    flex: 1,
    backgroundColor: "#2E7D32",
  },

  completedTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  // =====================================================
  // ACTIVE
  // =====================================================

  activeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#D32F2F",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D32F2F",
  },

  activeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  activeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#D32F2F",
    marginRight: 8,
  },

  currentBadge: {
    backgroundColor: "#FFEBEE",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  currentText: {
    color: "#D32F2F",
    fontSize: 11,
    fontWeight: "bold",
  },

  // =====================================================
  // PENDING
  // =====================================================

  pendingCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },

  pendingLine: {
    width: 3,
    flex: 1,
    backgroundColor: "#DDDDDD",
  },

  pendingTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#777777",
  },

  statusDescription: {
    color: "#777777",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },

  // =====================================================
  // NOTE
  // =====================================================


  // =====================================================
  // BUTTON
  // =====================================================

  homeButton: {
    width: "100%",
    backgroundColor: "#D32F2F",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  homeText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});