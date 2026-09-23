import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function NotificationsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BACK */}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* TITLE */}

      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>4</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Stay updated about your MANDI orders
      </Text>

      {/* ORDER CONFIRMED */}

      <View style={styles.notificationCard}>
        <View style={styles.iconCompleted}>
          <Text style={styles.iconText}>✓</Text>
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>
            Order Confirmed
          </Text>

          <Text style={styles.notificationText}>
            Your order #MAN10234 has been confirmed.
          </Text>

          <Text style={styles.time}>
            Just now
          </Text>
        </View>
      </View>

      {/* PREPARING */}

      <View style={styles.notificationCard}>
        <View style={styles.iconActive}>
          <Text style={styles.iconText}>●</Text>
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>
            Preparing Your Order
          </Text>

          <Text style={styles.notificationText}>
            Your fresh meat is being prepared and packed.
          </Text>

          <Text style={styles.time}>
            Today
          </Text>
        </View>
      </View>

      {/* OUT FOR DELIVERY */}

      <View style={styles.notificationCard}>
        <View style={styles.iconDelivery}>
          <Text style={styles.deliveryIcon}>→</Text>
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>
            Out for Delivery
          </Text>

          <Text style={styles.notificationText}>
            Your order is on the way. Please be available
            to receive your delivery.
          </Text>

          <Text style={styles.time}>
            Pending
          </Text>
        </View>
      </View>

      {/* DELIVERED */}

      <View style={styles.notificationCard}>
        <View style={styles.iconPending}>
          <Text style={styles.pendingIcon}>✓</Text>
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>
            Order Delivered
          </Text>

          <Text style={styles.notificationText}>
            You will receive a notification when your
            order has been delivered successfully.
          </Text>

          <Text style={styles.time}>
            Pending
          </Text>
        </View>
      </View>

      {/* TRACK ORDER */}

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() =>
          router.push({
            pathname: "/track-order",
            params: {
              orderId: "#MAN10234",
              name: "Chicken Curry Cut",
              slot: "6 PM - 8 PM",
            },
          })
        }
      >
        <Text style={styles.trackText}>
          Track Current Order
        </Text>
      </TouchableOpacity>

      {/* HOME */}

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

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111111",
  },

  badge: {
    backgroundColor: "#D32F2F",
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 7,
    marginBottom: 25,
  },

  notificationCard: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },

  iconCompleted: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconActive: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#D32F2F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconDelivery: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFF3F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconPending: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  deliveryIcon: {
    color: "#D32F2F",
    fontSize: 22,
    fontWeight: "bold",
  },

  pendingIcon: {
    color: "#999999",
    fontSize: 18,
    fontWeight: "bold",
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111111",
  },

  notificationText: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },

  time: {
    color: "#AAAAAA",
    fontSize: 12,
    marginTop: 8,
  },

  trackButton: {
    borderWidth: 1.5,
    borderColor: "#D32F2F",
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 15,
  },

  trackText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  homeButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    paddingVertical: 17,
    marginTop: 15,
  },

  homeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});