import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
// ALL PRODUCT IMAGES
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
  "Mutton Curry Cut": require("../../assets/images/mutton.png"),
  "Fresh Mutton": require("../../assets/images/mutton.png"),

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
// PRODUCT DETAILS SCREEN
// =====================================================

export default function ProductDetails() {
  const params = useLocalSearchParams();

  const { addToCart, cartCount } = useCart();

  // =====================================================
  // PRODUCT INFORMATION
  // =====================================================

  const productName = String(
    params.name || "Chicken Curry Cut"
  );

  const category = String(
    params.category || "Chicken"
  );

  const basePrice = Number(params.price) || 299;

  const defaultWeight = String(
    params.weight || "500g"
  );

  // =====================================================
  // STATE
  // =====================================================

  const [weight, setWeight] = useState(defaultWeight);

  const [cut, setCut] = useState("");

  const [added, setAdded] = useState(false);

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const productImage =
    productImages[productName] ||
    productImages["Chicken Curry Cut"];

  // =====================================================
  // WEIGHT OPTIONS
  // =====================================================

  const getWeightOptions = () => {
    // EGGS

    if (category === "Eggs") {
      return [
        {
          label: "6 Pieces",
          price: basePrice,
        },
        {
          label: "12 Pieces",
          price: basePrice * 2,
        },
        {
          label: "30 Pieces",
          price: basePrice * 5,
        },
      ];
    }

    // READY TO COOK

    if (category === "Ready to Cook") {
      return [
        {
          label: "250g",
          price: Math.round(basePrice / 2),
        },
        {
          label: "500g",
          price: basePrice,
        },
        {
          label: "1kg",
          price: basePrice * 2,
        },
      ];
    }

    // NORMAL MEAT / FISH

    return [
      {
        label: "250g",
        price: Math.round(basePrice / 2),
      },
      {
        label: "500g",
        price: basePrice,
      },
      {
        label: "1kg",
        price: basePrice * 2,
      },
    ];
  };

  const weights = getWeightOptions();

  // =====================================================
  // PREPARATION OPTIONS
  // =====================================================

  const getPreparationOptions = () => {
    // READY TO COOK

    if (category === "Ready to Cook") {
      return ["Ready to Cook Pack"];
    }

    // EGGS

    if (category === "Eggs") {
      return ["Standard Pack"];
    }

    // CHICKEN CURRY CUT

    if (productName === "Chicken Curry Cut") {
      return [
        "Curry Cut",
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // CHICKEN BREAST

    if (productName === "Chicken Breast") {
      return [
        "Whole Breast",
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // CHICKEN BONELESS

    if (productName === "Chicken Boneless") {
      return [
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // CHICKEN WINGS

    if (productName === "Chicken Wings") {
      return [
        "Whole Wings",
        "Cut Wings",
      ];
    }

    // CHICKEN DRUMSTICKS

    if (productName === "Chicken Drumsticks") {
      return [
        "Whole Drumsticks",
        "Cut Drumsticks",
      ];
    }

    // CHICKEN KEEMA

    if (productName === "Chicken Keema") {
      return [
        "Fine Mince",
        "Regular Mince",
      ];
    }

    // CHICKEN LIVER

    if (productName === "Chicken Liver") {
      return [
        "Whole",
        "Small Pieces",
        "Medium Pieces",
      ];
    }

    // CHICKEN SKIN

    if (productName === "Chicken Skin") {
      return ["Cleaned Pack"];
    }

    // MUTTON CURRY CUT

    if (
      productName === "Mutton Curry Cut" ||
      productName === "Fresh Mutton"
    ) {
      return [
        "Curry Cut",
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // MUTTON WITH BONE

    if (productName === "Mutton Curry Cut With Bone") {
      return [
        "Curry Cut",
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // MUTTON BONELESS

    if (productName === "Mutton Boneless") {
      return [
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // MUTTON KEEMA

    if (productName === "Mutton Keema") {
      return [
        "Fine Mince",
        "Regular Mince",
      ];
    }

    // MUTTON LIVER

    if (productName === "Mutton Liver") {
      return [
        "Small Pieces",
        "Medium Pieces",
      ];
    }

    // FRESH FISH

    if (productName === "Fresh Fish") {
      return [
        "Whole Cleaned",
        "Curry Cut",
        "Tawa Cut",
      ];
    }

    // FISH CURRY CUT

    if (productName === "Fish Curry Cut") {
      return [
        "Curry Cut",
        "Small Pieces",
        "Medium Pieces",
      ];
    }

    // FISH TAWA CUT

    if (productName === "Fish Tawa Cut") {
      return [
        "Tawa Cut",
        "Thin Slices",
        "Medium Slices",
      ];
    }

    // FISH FILLET

    if (productName === "Fish Fillet") {
      return [
        "Whole Fillet",
        "Small Pieces",
        "Medium Pieces",
      ];
    }

    // FISH BONELESS

    if (productName === "Fish Boneless") {
      return [
        "Small Pieces",
        "Medium Pieces",
        "Large Pieces",
      ];
    }

    // PRAWNS

    if (
      productName === "Fresh Prawns" ||
      productName === "Cleaned Prawns"
    ) {
      return [
        "Cleaned",
        "Deveined",
        "Tail On",
      ];
    }

    return ["Standard Pack"];
  };

  const preparationOptions =
    getPreparationOptions();

  // =====================================================
  // SET DEFAULT PREPARATION
  // =====================================================

  useEffect(() => {
    if (preparationOptions.length > 0) {
      setCut(preparationOptions[0]);
    }
  }, [productName]);

  // =====================================================
  // SELECTED PRICE
  // =====================================================

  const selectedPrice =
    weights.find(
      (item) => item.label === weight
    )?.price || basePrice;

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    const selectedPreparation =
      cut || preparationOptions[0];

    const itemId =
      `${productName}-${weight}-${selectedPreparation}`;

    addToCart({
      id: itemId,
      name: productName,
      weight,
      cut: selectedPreparation,
      price: selectedPrice,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        {/* BACK */}

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.back}>
            ← Back
          </Text>
        </TouchableOpacity>

        {/* CART */}

        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() =>
            router.push("/cart")
          }
        >
          <Text style={styles.cartIcon}>
            🛒
          </Text>

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartCount > 99
                  ? "99+"
                  : cartCount}
              </Text>
            </View>
          )}

        </TouchableOpacity>

      </View>

      {/* =================================================
          PRODUCT IMAGE
      ================================================= */}

      <View style={styles.imageBox}>
        <Image
          source={productImage}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* =================================================
          DETAILS
      ================================================= */}

      <View style={styles.detailsContainer}>

        {/* PRODUCT NAME */}

        <Text style={styles.name}>
          {productName}
        </Text>

        {/* CATEGORY */}

        <Text style={styles.category}>
          {category}
        </Text>

        {/* DESCRIPTION */}

        <Text style={styles.description}>
          Fresh, hygienically cleaned and carefully packed.
        </Text>

        {/* =================================================
            SELECT WEIGHT
        ================================================= */}

        <Text style={styles.sectionTitle}>
          {category === "Eggs"
            ? "Select Quantity"
            : "Select Weight"}
        </Text>

        <View style={styles.options}>

          {weights.map((item) => {
            const isSelected =
              weight === item.label;

            return (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.option,

                  isSelected &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                  setWeight(item.label)
                }
              >
                <Text
                  style={[
                    styles.optionText,

                    isSelected &&
                      styles.selectedText,
                  ]}
                >
                  {item.label}
                </Text>

                <Text
                  style={[
                    styles.optionPrice,

                    isSelected &&
                      styles.selectedText,
                  ]}
                >
                  ₹{item.price}
                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* =================================================
            CUTTING / PREPARATION
        ================================================= */}

        <Text style={styles.sectionTitle}>
          {category === "Ready to Cook"
            ? "Pack Type"
            : category === "Eggs"
            ? "Pack Type"
            : "Cutting / Preparation"}
        </Text>

        <View style={styles.cutContainer}>

          {preparationOptions.map((item) => {
            const isSelected =
              cut === item ||
              (!cut &&
                item === preparationOptions[0]);

            return (
              <TouchableOpacity
                key={item}
                style={styles.cutRow}
                onPress={() =>
                  setCut(item)
                }
              >
                <View
                  style={[
                    styles.radio,

                    isSelected &&
                      styles.radioSelected,
                  ]}
                />

                <Text style={styles.cutText}>
                  {item}
                </Text>

              </TouchableOpacity>
            );
          })}

        </View>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {added && (
          <View style={styles.successBox}>

            <Text style={styles.successText}>
              ✓ Product added to cart
            </Text>

          </View>
        )}

        {/* =================================================
            PRICE + ADD TO CART
        ================================================= */}

        <View style={styles.bottom}>

          <View>

            <Text style={styles.totalLabel}>
              Price
            </Text>

            <Text style={styles.price}>
              ₹{selectedPrice}
            </Text>

          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.cartText}>
              Add to Cart
            </Text>
          </TouchableOpacity>

        </View>

        {/* =================================================
            VIEW CART
        ================================================= */}

        {cartCount > 0 && (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() =>
              router.push("/cart")
            }
          >
            <Text style={styles.viewCartText}>
              View Cart ({cartCount})
            </Text>
          </TouchableOpacity>
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

  content: {
    padding: 20,
    paddingBottom: 60,
  },

  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 20,

    width: "100%",
    maxWidth: 1000,

    alignSelf: "center",
  },

  back: {
    color: "#D32F2F",
    fontSize: 16,
  },

  // =====================================================
  // CART
  // =====================================================

  cartIconContainer: {
    position: "relative",

    width: 48,
    height: 48,

    backgroundColor: "#FFF3F3",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },

  cartIcon: {
    fontSize: 24,
  },

  badge: {
    position: "absolute",

    top: -5,
    right: -5,

    backgroundColor: "#D32F2F",

    minWidth: 21,
    height: 21,

    borderRadius: 11,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 5,

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "bold",
  },

  // =====================================================
  // IMAGE
  // =====================================================

  imageBox: {
    width: "100%",

    maxWidth: 900,

    height: 380,

    alignSelf: "center",

    backgroundColor: "#FFF3F3",

    borderRadius: 20,

    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  // =====================================================
  // DETAILS
  // =====================================================

  detailsContainer: {
    width: "100%",

    maxWidth: 900,

    alignSelf: "center",
  },

  name: {
    fontSize: 27,

    fontWeight: "bold",

    marginTop: 25,
  },

  category: {
    color: "#D32F2F",

    fontSize: 14,

    fontWeight: "600",

    marginTop: 5,
  },

  description: {
    color: "#777777",

    fontSize: 15,

    marginTop: 8,

    marginBottom: 25,
  },

  // =====================================================
  // SECTION TITLE
  // =====================================================

  sectionTitle: {
    fontSize: 20,

    fontWeight: "bold",

    marginTop: 15,

    marginBottom: 15,
  },

  // =====================================================
  // OPTIONS
  // =====================================================

  options: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,
  },

  option: {
    borderWidth: 1,

    borderColor: "#DDDDDD",

    borderRadius: 10,

    minWidth: 100,

    paddingHorizontal: 25,

    paddingVertical: 14,

    alignItems: "center",
  },

  selectedOption: {
    backgroundColor: "#D32F2F",

    borderColor: "#D32F2F",
  },

  optionText: {
    fontWeight: "600",

    fontSize: 16,
  },

  optionPrice: {
    fontSize: 13,

    marginTop: 5,

    color: "#777777",
  },

  selectedText: {
    color: "#FFFFFF",
  },

  // =====================================================
  // PREPARATION
  // =====================================================

  cutContainer: {
    marginBottom: 10,
  },

  cutRow: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 13,
  },

  radio: {
    width: 22,

    height: 22,

    borderRadius: 11,

    borderWidth: 2,

    borderColor: "#CCCCCC",

    marginRight: 12,
  },

  radioSelected: {
    borderWidth: 6,

    borderColor: "#D32F2F",
  },

  cutText: {
    fontSize: 16,
  },

  // =====================================================
  // SUCCESS
  // =====================================================

  successBox: {
    backgroundColor: "#E8F5E9",

    borderRadius: 10,

    padding: 13,

    marginTop: 20,
  },

  successText: {
    color: "#2E7D32",

    fontWeight: "bold",

    textAlign: "center",
  },

  // =====================================================
  // BOTTOM
  // =====================================================

  bottom: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 30,
  },

  totalLabel: {
    color: "#777777",

    fontSize: 14,
  },

  price: {
    fontSize: 27,

    fontWeight: "bold",

    marginTop: 3,
  },

  cartButton: {
    backgroundColor: "#D32F2F",

    paddingHorizontal: 40,

    paddingVertical: 17,

    borderRadius: 10,
  },

  cartText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "bold",
  },

  // =====================================================
  // VIEW CART
  // =====================================================

  viewCartButton: {
    borderWidth: 1,

    borderColor: "#D32F2F",

    borderRadius: 10,

    paddingVertical: 17,

    marginTop: 20,
  },

  viewCartText: {
    color: "#D32F2F",

    textAlign: "center",

    fontSize: 16,

    fontWeight: "bold",
  },
});