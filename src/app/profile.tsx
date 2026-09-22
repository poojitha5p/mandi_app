import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const logout = () => {
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>My Account</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>N</Text>
        </View>

        <View>
          <Text style={styles.name}>Navya</Text>
          <Text style={styles.mobile}>Customer Account</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>👤 My Profile</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/address")}
      >
        <Text style={styles.menuText}>📍 Saved Addresses</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/orders")}
      >
        <Text style={styles.menuText}>📦 My Orders</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Settings</Text>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>🔔 Notifications</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>❓ Help & Support</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>📄 Terms & Conditions</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>MANDI v1.0.0</Text>
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

  profileCard: {
    backgroundColor: "#FFF3F3",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D32F2F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  mobile: {
    color: "#777777",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 10,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  menuText: {
    fontSize: 16,
  },

  arrow: {
    fontSize: 25,
    color: "#999999",
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 10,
    padding: 16,
    marginTop: 35,
  },

  logoutText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  version: {
    textAlign: "center",
    color: "#AAAAAA",
    marginTop: 25,
  },
});