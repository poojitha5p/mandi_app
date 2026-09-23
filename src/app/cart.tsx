import { router } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "../context/CartContext";

// =====================================================
// PRODUCT IMAGES
// =====================================================

const productImages: Record<string, any> = {
  // CHICKEN
  "Chicken Curry Cut": require("../../assets/images/chicken-curry-cut.jpg"),
  "Chicken Breast": require("../../assets/images/chicken-breast.jpeg"),
  "Chicken Boneless": require("../../assets/images/chicken-boneless.webp"),
  "Chicken Wings": require("../../assets/images/chicken-wings.jpg"),
  "Chicken Drumsticks": require("../../assets/images/chicken-drumsticks.jpg"),
  "Chicken Keema": require("../../assets/images/chicken-keema.jpg"),
  "Chicken Liver": require("../../assets/images/chicken-liver.jpg"),
  "Chicken Skin": require("../../assets/images/chicken-skin.jpg"),

  // MUTTON
  "Fresh Mutton": require("../../assets/images/mutton.png"),
  "Mutton Curry Cut": require("../../assets/images/mutton.png"),
  "Mutton Curry Cut With Bone": require(
    "../../assets/images/mutton-currycut-with-bone.jpeg"
  ),
  "Mutton Boneless": require("../../assets/images/mutton-boneless.jpg"),
  "Mutton Keema": require("../../assets/images/mutton-keema.jpg"),
  "Mutton Liver": require("../../assets/images/mutton-liver.jpg"),

  // FISH
  "Fresh Fish": require("../../assets/images/fish.jpg"),
  "Fish Curry Cut": require("../../assets/images/fish-curry-cut.jpg"),
  "Fish Tawa Cut": require("../../assets/images/fish-tawa-cut.jpg"),
  "Fish Fillet": require("../../assets/images/fish-fillet.jpg"),
  "Fish Boneless": require("../../assets/images/fish-boneless.jpg"),

  // SEAFOOD
  "Fresh Prawns": require("../../assets/images/prawns.jpeg"),
  "Cleaned Prawns": require("../../assets/images/cleaned-prawns.jpg"),

  // EGGS
  "Farm Fresh Eggs": require("../../assets/images/eggs.jpg"),

  // READY TO COOK
  "Chicken Tikka": require("../../assets/images/chicken-tikka.png"),
  "Chicken Kebab": require("../../assets/images/chicken-kebab.png"),
  "Chicken 65": require("../../assets/images/chicken-65.png"),
  "Tandoori Chicken": require("../../assets/images/chicken-tandoori.png"),
  "Marinated Chicken": require("../../assets/images/marinated-chicken.jpg"),
  "Fish Tikka": require("../../assets/images/fish-tikka.jpg"),
};

// =====================================================
// CART SCREEN
// =====================================================

export default function CartScreen() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const total = cartTotal + deliveryFee;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.mainContent}>
        {/* BACK */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        {/* TITLE */}

        <View style={styles.titleRow}>
          <Text style={styles.title}>Your Cart</Text>

          {cartCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {cartCount}
              </Text>
            </View>
          )}
        </View>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>

            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>

            <Text style={styles.emptyText}>
              Add some fresh products to your cart.
            </Text>

            <TouchableOpacity
              style={styles.shoppingButton}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.shoppingButtonText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* =========================================
                CART ITEMS
            ========================================= */}

            {cartItems.map((item) => {
              const productImage =
                productImages[item.name] ||
                productImages["Chicken Curry Cut"];

              return (
                <View
                  key={item.id}
                  style={styles.productCard}
                >
                  {/* TOP SECTION */}

                  <View style={styles.productTopRow}>
                    {/* REAL IMAGE */}

                    <View style={styles.imageBox}>
                      <Image
                        source={productImage}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    {/* PRODUCT INFORMATION */}

                    <View style={styles.productInfo}>
                      <Text
                        style={styles.productName}
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={styles.productDetails}
                        numberOfLines={2}
                      >
                        {item.weight}
                        {item.cut ? ` • ${item.cut}` : ""}
                      </Text>

                      {/* UNIT PRICE ONLY */}

                      <Text style={styles.productPrice}>
                        ₹{item.price}
                      </Text>
                    </View>
                  </View>

                  {/* BOTTOM SECTION */}

                  <View style={styles.cardBottom}>
                    {/* REMOVE */}

                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() =>
                        removeFromCart(item.id)
                      }
                    >
                      <Text style={styles.remove}>
                        Remove
                      </Text>
                    </TouchableOpacity>

                    {/* QUANTITY */}

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        <Text
                          style={styles.quantityButtonText}
                        >
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        <Text
                          style={styles.quantityButtonText}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}

            {/* =========================================
                BILL DETAILS
            ========================================= */}

            <View style={styles.billCard}>
              <Text style={styles.billTitle}>
                Bill Details
              </Text>

              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Subtotal
                </Text>

                <Text style={styles.rowValue}>
                  ₹{cartTotal}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Delivery Fee
                </Text>

                <Text style={styles.rowValue}>
                  ₹{deliveryFee}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.row}>
                <Text style={styles.totalText}>
                  Total
                </Text>

                <Text style={styles.totalText}>
                  ₹{total}
                </Text>
              </View>
            </View>

            {/* =========================================
                CHECKOUT
            ========================================= */}

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                router.push({
                  pathname: "/checkout",
                  params: {
                    subtotal: String(cartTotal),
                    deliveryFee: String(deliveryFee),
                    total: String(total),
                  },
                })
              }
            >
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>

            {/* ADD MORE */}

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.continueText}>
                + Add More Items
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 60,
  },

  mainContent: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },

  // BACK

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  back: {
    color: "#D32F2F",
    fontSize: 16,
  },

  // TITLE

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  countBadge: {
    backgroundColor: "#D32F2F",
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    paddingHorizontal: 8,
  },

  countBadgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // =====================================================
  // PRODUCT CARD
  // =====================================================

  productCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },

  productTopRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  // IMAGE

  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#FFF3F3",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  // PRODUCT INFO

  productInfo: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
  },

  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    lineHeight: 23,
  },

  productDetails: {
    color: "#777777",
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
  },

  productPrice: {
    color: "#111111",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 7,
  },

  // =====================================================
  // CARD BOTTOM
  // =====================================================

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  // REMOVE

  removeButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },

  remove: {
    color: "#D32F2F",
    fontSize: 15,
    fontWeight: "600",
  },

  // QUANTITY

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantityButton: {
    width: 38,
    height: 38,
    borderWidth: 1.5,
    borderColor: "#D32F2F",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#D32F2F",
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 24,
  },

  quantityText: {
    minWidth: 38,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  // =====================================================
  // BILL
  // =====================================================

  billCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },

  billTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  rowLabel: {
    fontSize: 16,
    color: "#333333",
  },

  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginBottom: 18,
  },

  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // =====================================================
  // CHECKOUT
  // =====================================================

  checkoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 17,
    borderRadius: 10,
    marginTop: 25,
  },

  checkoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  // =====================================================
  // ADD MORE
  // =====================================================

  continueButton: {
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 10,
    marginTop: 12,
  },

  continueText: {
    color: "#D32F2F",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  // =====================================================
  // EMPTY CART
  // =====================================================

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  emptyText: {
    fontSize: 15,
    color: "#777777",
    marginTop: 8,
    textAlign: "center",
  },

  shoppingButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  shoppingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});