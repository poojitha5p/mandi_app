import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CheckoutScreen() {
  const params = useLocalSearchParams();

  // -----------------------------
  // PRODUCT DATA
  // -----------------------------

  const productName =
    typeof params.name === "string"
      ? params.name
      : "Chicken Curry Cut";

  const weight =
    typeof params.weight === "string"
      ? params.weight
      : "500g";

  const cut =
    typeof params.cut === "string"
      ? params.cut
      : "Curry Cut";

  const price =
    typeof params.price === "string"
      ? Number(params.price)
      : 299;

  const quantity =
    typeof params.quantity === "string"
      ? Number(params.quantity)
      : 1;

  // -----------------------------
  // ADDRESS DATA
  // -----------------------------

  const customerName =
    typeof params.customerName === "string"
      ? params.customerName
      : "";

  const address =
    typeof params.address === "string"
      ? params.address
      : "";

  const mobile =
    typeof params.mobile === "string"
      ? params.mobile
      : "";

  // -----------------------------
  // DELIVERY SLOT
  // -----------------------------

  const selectedSlot =
    typeof params.slot === "string"
      ? params.slot
      : "";

  // -----------------------------
  // PAYMENT METHOD
  // -----------------------------

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  // -----------------------------
  // PRICE CALCULATION
  // -----------------------------

  const subtotal = price * quantity;

  const deliveryFee = 30;

  const total = subtotal + deliveryFee;

  // -----------------------------
  // OPEN ADDRESS SCREEN
  // -----------------------------

  const openAddress = () => {
    router.push({
      pathname: "/address",
      params: {
        ...params,

        name: productName,
        weight: weight,
        cut: cut,
        price: String(price),
        quantity: String(quantity),

        slot: selectedSlot,
      },
    });
  };

  // -----------------------------
  // OPEN DELIVERY SLOT
  // -----------------------------

  const openDeliverySlot = () => {
    router.push({
      pathname: "/delivery-slot",
      params: {
        ...params,

        name: productName,
        weight: weight,
        cut: cut,
        price: String(price),
        quantity: String(quantity),

        customerName: customerName,
        address: address,
        mobile: mobile,
      },
    });
  };

  // -----------------------------
  // PLACE ORDER
  // -----------------------------

  const placeOrder = () => {
    router.push({
      pathname: "/order-confirmation",

      params: {
        name: productName,
        weight: weight,
        cut: cut,

        price: String(price),
        quantity: String(quantity),

        subtotal: String(subtotal),
        deliveryFee: String(deliveryFee),
        total: String(total),

        customerName: customerName,
        address: address,
        mobile: mobile,

        slot: selectedSlot,

        paymentMethod: paymentMethod,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* BACK */}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}

      <Text style={styles.title}>Checkout</Text>

      {/* ================= ADDRESS ================= */}

      <Text style={styles.sectionTitle}>
        Delivery Address
      </Text>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Home</Text>

          {address ? (
            <>
              {customerName ? (
                <Text style={styles.customerName}>
                  {customerName}
                </Text>
              ) : null}

              <Text style={styles.cardText}>
                {address}
              </Text>

              {mobile ? (
                <Text style={styles.cardText}>
                  Mobile: {mobile}
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.cardText}>
              Select your delivery address
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={openAddress}>
          <Text style={styles.change}>
            {address ? "Change" : "Select"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= DELIVERY SLOT ================= */}

      <Text style={styles.sectionTitle}>
        Delivery Slot
      </Text>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Today
          </Text>

          <Text style={styles.cardText}>
            {selectedSlot
              ? selectedSlot
              : "Select delivery time"}
          </Text>
        </View>

        <TouchableOpacity onPress={openDeliverySlot}>
          <Text style={styles.change}>
            {selectedSlot ? "Change" : "Select"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= ORDER SUMMARY ================= */}

      <Text style={styles.sectionTitle}>
        Order Summary
      </Text>

      <View style={styles.summary}>
        <Text style={styles.productName}>
          {productName}
        </Text>

        <Text style={styles.productDetails}>
          {weight} • {cut}
        </Text>

        <Text style={styles.productDetails}>
          Quantity: {quantity}
        </Text>

        {/* ITEM PRICE */}

        <View style={styles.row}>
          <Text style={styles.rowText}>
            Item Price
          </Text>

          <Text style={styles.rowText}>
            ₹{price} × {quantity}
          </Text>
        </View>

        {/* SUBTOTAL */}

        <View style={styles.row}>
          <Text style={styles.rowText}>
            Subtotal
          </Text>

          <Text style={styles.rowText}>
            ₹{subtotal}
          </Text>
        </View>

        {/* DELIVERY */}

        <View style={styles.row}>
          <Text style={styles.rowText}>
            Delivery Fee
          </Text>

          <Text style={styles.rowText}>
            ₹{deliveryFee}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* TOTAL */}

        <View style={styles.row}>
          <Text style={styles.total}>
            Total
          </Text>

          <Text style={styles.total}>
            ₹{total}
          </Text>
        </View>
      </View>

      {/* ================= PAYMENT ================= */}

      <Text style={styles.sectionTitle}>
        Payment Method
      </Text>

      {/* CASH ON DELIVERY */}

      <TouchableOpacity
        style={[
          styles.payment,
          paymentMethod === "Cash on Delivery" &&
            styles.selectedPayment,
        ]}
        onPress={() =>
          setPaymentMethod("Cash on Delivery")
        }
      >
        <View
          style={[
            styles.radioCircle,
            paymentMethod === "Cash on Delivery" &&
              styles.radioSelected,
          ]}
        />

        <Text style={styles.paymentText}>
          Cash on Delivery
        </Text>
      </TouchableOpacity>

      {/* UPI */}

      <TouchableOpacity
        style={[
          styles.payment,
          paymentMethod === "UPI" &&
            styles.selectedPayment,
        ]}
        onPress={() => setPaymentMethod("UPI")}
      >
        <View
          style={[
            styles.radioCircle,
            paymentMethod === "UPI" &&
              styles.radioSelected,
          ]}
        />

        <Text style={styles.paymentText}>
          UPI
        </Text>
      </TouchableOpacity>

      {/* CARD */}

      <TouchableOpacity
        style={[
          styles.payment,
          paymentMethod === "Credit / Debit Card" &&
            styles.selectedPayment,
        ]}
        onPress={() =>
          setPaymentMethod("Credit / Debit Card")
        }
      >
        <View
          style={[
            styles.radioCircle,
            paymentMethod === "Credit / Debit Card" &&
              styles.radioSelected,
          ]}
        />

        <Text style={styles.paymentText}>
          Credit / Debit Card
        </Text>
      </TouchableOpacity>

      {/* ================= PLACE ORDER ================= */}

      <TouchableOpacity
        style={styles.orderButton}
        onPress={placeOrder}
      >
        <Text style={styles.orderText}>
          Place Order • ₹{total}
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

  contentContainer: {
    padding: 20,
    paddingBottom: 60,
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },

  // ADDRESS + DELIVERY CARD

  card: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    paddingRight: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },

  customerName: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },

  cardText: {
    color: "#777777",
    marginTop: 5,
    lineHeight: 20,
  },

  change: {
    color: "#D32F2F",
    fontWeight: "bold",
  },

  // ORDER SUMMARY

  summary: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 20,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  productDetails: {
    color: "#777777",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  rowText: {
    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginTop: 18,
  },

  total: {
    fontSize: 19,
    fontWeight: "bold",
  },

  // PAYMENT

  payment: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEEEEE",

    padding: 17,
    marginBottom: 10,

    borderRadius: 10,
  },

  selectedPayment: {
    borderColor: "#D32F2F",
    backgroundColor: "#FFF8F8",
  },

  radioCircle: {
    width: 20,
    height: 20,

    borderRadius: 10,

    borderWidth: 2,
    borderColor: "#CCCCCC",

    marginRight: 12,
  },

  radioSelected: {
    borderWidth: 6,
    borderColor: "#D32F2F",
  },

  paymentText: {
    fontSize: 16,
  },

  // ORDER BUTTON

  orderButton: {
    backgroundColor: "#D32F2F",

    borderRadius: 10,

    padding: 18,

    marginTop: 30,
  },

  orderText: {
    color: "#FFFFFF",

    textAlign: "center",

    fontWeight: "bold",

    fontSize: 17,
  },
});