import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "../context/CartContext";

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

  // Select emoji based on product
  const getProductEmoji = (name: string) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("fish")) return "🐟";
    if (lowerName.includes("prawn")) return "🦐";
    if (lowerName.includes("seafood")) return "🦐";
    if (lowerName.includes("mutton")) return "🥩";
    if (lowerName.includes("egg")) return "🥚";

    return "🍗";
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
          {/* MULTIPLE CART PRODUCTS */}

          {cartItems.map((item) => (
            <View
              key={item.id}
              style={styles.itemWrapper}
            >
              <View style={styles.productCard}>
                {/* IMAGE */}

                <View style={styles.imageBox}>
                  <Text style={styles.image}>
                    {getProductEmoji(item.name)}
                  </Text>
                </View>

                {/* PRODUCT INFO */}

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {item.name}
                  </Text>

                  <Text style={styles.productDetails}>
                    {item.weight} • {item.cut}
                  </Text>

                  <Text style={styles.productPrice}>
                    ₹{item.price}
                  </Text>

                  {item.quantity > 1 && (
                    <Text style={styles.itemSubtotal}>
                      ₹{item.price} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </Text>
                  )}
                </View>

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

              {/* REMOVE */}

              <TouchableOpacity
                onPress={() =>
                  removeFromCart(item.id)
                }
              >
                <Text style={styles.remove}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* BILL DETAILS */}

          <View style={styles.billCard}>
            <Text style={styles.billTitle}>
              Bill Details
            </Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                Items ({cartCount})
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

          {/* CHECKOUT */}

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
              Proceed to Checkout • ₹{total}
            </Text>
          </TouchableOpacity>

          {/* CONTINUE SHOPPING */}

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
    </ScrollView>
  );
}

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
    marginBottom: 25,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  countBadge: {
    backgroundColor: "#D32F2F",
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    paddingHorizontal: 8,
  },

  countBadgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  itemWrapper: {
    marginBottom: 20,
  },

  productCard: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  imageBox: {
    width: 95,
    height: 95,
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    fontSize: 45,
  },

  productInfo: {
    flex: 1,
    marginLeft: 18,
  },

  productName: {
    fontSize: 19,
    fontWeight: "bold",
  },

  productDetails: {
    color: "#777777",
    fontSize: 15,
    marginTop: 6,
  },

  productPrice: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 8,
  },

  itemSubtotal: {
    color: "#777777",
    fontSize: 13,
    marginTop: 4,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  quantityButton: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#D32F2F",
    fontSize: 23,
  },

  quantityText: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 15,
  },

  remove: {
    color: "#D32F2F",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
  },

  billCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 22,
    marginTop: 10,
  },

  billTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  rowLabel: {
    fontSize: 16,
  },

  rowValue: {
    fontSize: 16,
    fontWeight: "500",
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

  checkoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 30,
  },

  checkoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  continueButton: {
    paddingVertical: 17,
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