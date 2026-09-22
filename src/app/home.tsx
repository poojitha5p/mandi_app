import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useCart } from "../context/CartContext";

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
  "Chicken",
  "Mutton",
  "Fish",
  "Seafood",
  "Eggs",
  "Ready to Cook",
];

// =====================================================
// PRODUCTS
// =====================================================

const products = [
  // =====================================================
  // CHICKEN
  // =====================================================

  {
    id: 1,
    name: "Chicken Curry Cut",
    category: "Chicken",
    weight: "500g",
    price: 299,
    image: require("../../assets/images/chicken-curry-cut.jpg"),
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Chicken",
    weight: "500g",
    price: 249,
    image: require("../../assets/images/chicken-breast.jpeg"),
  },
  {
    id: 3,
    name: "Chicken Boneless",
    category: "Chicken",
    weight: "500g",
    price: 349,
    image: require("../../assets/images/chicken-boneless.webp"),
  },
  {
    id: 4,
    name: "Chicken Wings",
    category: "Chicken",
    weight: "500g",
    price: 279,
    image: require("../../assets/images/chicken-wings.jpg"),
  },
  {
    id: 5,
    name: "Chicken Drumsticks",
    category: "Chicken",
    weight: "500g",
    price: 329,
    image: require("../../assets/images/chicken-drumsticks.jpg"),
  },
  {
    id: 6,
    name: "Chicken Keema",
    category: "Chicken",
    weight: "500g",
    price: 349,
    image: require("../../assets/images/chicken-keema.jpg"),
  },
  {
    id: 7,
    name: "Chicken Liver",
    category: "Chicken",
    weight: "500g",
    price: 179,
    image: require("../../assets/images/chicken-liver.jpg"),
  },
  {
    id: 8,
    name: "Chicken Skin",
    category: "Chicken",
    weight: "500g",
    price: 149,
    image: require("../../assets/images/chicken-skin.jpg"),
  },

  // =====================================================
  // MUTTON
  // =====================================================

  {
    id: 9,
    name: "Mutton Curry Cut",
    category: "Mutton",
    weight: "500g",
    price: 549,
    image: require("../../assets/images/mutton.png"),
  },
  {
    id: 10,
    name: "Mutton Curry Cut With Bone",
    category: "Mutton",
    weight: "500g",
    price: 529,
    image: require("../../assets/images/mutton-currycut-with-bone.jpeg"),
  },
  {
    id: 11,
    name: "Mutton Boneless",
    category: "Mutton",
    weight: "500g",
    price: 649,
    image: require("../../assets/images/mutton-boneless.jpg"),
  },
  {
    id: 12,
    name: "Mutton Keema",
    category: "Mutton",
    weight: "500g",
    price: 599,
    image: require("../../assets/images/mutton-keema.jpg"),
  },
  {
    id: 13,
    name: "Mutton Liver",
    category: "Mutton",
    weight: "500g",
    price: 349,
    image: require("../../assets/images/mutton-liver.jpg"),
  },

  // =====================================================
  // FISH
  // =====================================================

  {
    id: 14,
    name: "Fresh Fish",
    category: "Fish",
    weight: "500g",
    price: 399,
    image: require("../../assets/images/fish.jpg"),
  },
  {
    id: 15,
    name: "Fish Curry Cut",
    category: "Fish",
    weight: "500g",
    price: 429,
    image: require("../../assets/images/fish-curry-cut.jpg"),
  },
  {
    id: 16,
    name: "Fish Tawa Cut",
    category: "Fish",
    weight: "500g",
    price: 449,
    image: require("../../assets/images/fish-tawa-cut.jpg"),
  },
  {
    id: 17,
    name: "Fish Fillet",
    category: "Fish",
    weight: "500g",
    price: 499,
    image: require("../../assets/images/fish-fillet.jpg"),
  },
  {
    id: 18,
    name: "Fish Boneless",
    category: "Fish",
    weight: "500g",
    price: 529,
    image: require("../../assets/images/fish-boneless.jpg"),
  },

  // =====================================================
  // SEAFOOD
  // =====================================================

  {
    id: 19,
    name: "Fresh Prawns",
    category: "Seafood",
    weight: "500g",
    price: 449,
    image: require("../../assets/images/prawns.jpeg"),
  },
  {
    id: 20,
    name: "Cleaned Prawns",
    category: "Seafood",
    weight: "500g",
    price: 499,
    image: require("../../assets/images/cleaned-prawns.jpg"),
  },

  // =====================================================
  // EGGS
  // =====================================================

  {
    id: 21,
    name: "Farm Fresh Eggs",
    category: "Eggs",
    weight: "6 Pieces",
    price: 90,
    image: require("../../assets/images/eggs.jpg"),
  },

  // =====================================================
  // READY TO COOK
  // =====================================================

  {
    id: 22,
    name: "Chicken Tikka",
    category: "Ready to Cook",
    weight: "500g",
    price: 399,
    image: require("../../assets/images/chicken-tikka.png"),
  },
  {
    id: 23,
    name: "Chicken Kebab",
    category: "Ready to Cook",
    weight: "500g",
    price: 379,
    image: require("../../assets/images/chicken-kebab.png"),
  },
  {
    id: 24,
    name: "Chicken 65",
    category: "Ready to Cook",
    weight: "500g",
    price: 349,
    image: require("../../assets/images/chicken-65.png"),
  },
  {
    id: 25,
    name: "Tandoori Chicken",
    category: "Ready to Cook",
    weight: "500g",
    price: 429,
    image: require("../../assets/images/chicken-tandoori.png"),
  },
  {
    id: 26,
    name: "Marinated Chicken",
    category: "Ready to Cook",
    weight: "500g",
    price: 399,
    image: require("../../assets/images/marinated-chicken.jpg"),
  },
  {
    id: 27,
    name: "Fish Tikka",
    category: "Ready to Cook",
    weight: "500g",
    price: 449,
    image: require("../../assets/images/fish-tikka.jpg"),
  },
];

type SortType = "default" | "low" | "high";

// =====================================================
// HOME SCREEN
// =====================================================

export default function HomeScreen() {
  const { cartCount } = useCart();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortType, setSortType] =
    useState<SortType>("default");

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // =====================================================
  // SORT PRODUCTS
  // =====================================================

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortType === "low") {
        return a.price - b.price;
      }

      if (sortType === "high") {
        return b.price - a.price;
      }

      return 0;
    }
  );

  // =====================================================
  // OPEN PRODUCT
  // =====================================================

  const openProduct = (
    product: (typeof products)[0]
  ) => {
    router.push({
      pathname: "/product-details",
      params: {
        id: String(product.id),
        name: product.name,
        category: product.category,
        weight: product.weight,
        price: String(product.price),
      },
    });
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortType("default");
  };

  // =====================================================
  // CATEGORY ICON
  // =====================================================

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Chicken":
        return "🍗";

      case "Mutton":
        return "🥩";

      case "Fish":
        return "🐟";

      case "Seafood":
        return "🦐";

      case "Eggs":
        return "🥚";

      case "Ready to Cook":
        return "🍽️";

      default:
        return "🛍️";
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            MANDI
          </Text>

          <Text style={styles.location}>
            Deliver to: Home ▼
          </Text>
        </View>

        <View style={styles.headerIcons}>
          {/* CART */}

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.icon}>
              🛒
            </Text>

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* PROFILE */}

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              router.push("/profile")
            }
          >
            <Text style={styles.icon}>
              👤
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* =================================================
          SEARCH
      ================================================= */}

      <TextInput
        style={styles.search}
        placeholder="Search chicken, mutton, fish, ready to cook..."
        placeholderTextColor="#999999"
        value={search}
        onChangeText={setSearch}
      />

      {/* =================================================
          BANNER
      ================================================= */}

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Fresh Meat Delivered
        </Text>

        <Text style={styles.bannerText}>
          Fresh • Clean • Quality
        </Text>
      </View>

      {/* =================================================
          CATEGORY
      ================================================= */}

      <Text style={styles.heading}>
        Shop by Category
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* ALL */}

        <TouchableOpacity
          style={[
            styles.category,
            selectedCategory === "All" &&
              styles.selectedCategory,
          ]}
          onPress={() =>
            setSelectedCategory("All")
          }
        >
          <Text style={styles.categoryIcon}>
            🛍️
          </Text>

          <Text
            style={[
              styles.categoryText,
              selectedCategory === "All" &&
                styles.selectedCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {/* OTHER CATEGORIES */}

        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.category,
              selectedCategory === category &&
                styles.selectedCategory,
            ]}
            onPress={() =>
              setSelectedCategory(category)
            }
          >
            <Text style={styles.categoryIcon}>
              {getCategoryIcon(category)}
            </Text>

            <Text
              style={[
                styles.categoryText,
                selectedCategory === category &&
                  styles.selectedCategoryText,
              ]}
              numberOfLines={2}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* =================================================
          SORT
      ================================================= */}

      <View style={styles.sortHeader}>
        <Text style={styles.heading}>
          Sort Products
        </Text>

        <TouchableOpacity
          onPress={resetFilters}
        >
          <Text style={styles.reset}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortContainer}
      >
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === "default" &&
              styles.activeSortButton,
          ]}
          onPress={() =>
            setSortType("default")
          }
        >
          <Text
            style={[
              styles.sortText,
              sortType === "default" &&
                styles.activeSortText,
            ]}
          >
            Default
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === "low" &&
              styles.activeSortButton,
          ]}
          onPress={() =>
            setSortType("low")
          }
        >
          <Text
            style={[
              styles.sortText,
              sortType === "low" &&
                styles.activeSortText,
            ]}
          >
            Price: Low → High
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === "high" &&
              styles.activeSortButton,
          ]}
          onPress={() =>
            setSortType("high")
          }
        >
          <Text
            style={[
              styles.sortText,
              sortType === "high" &&
                styles.activeSortText,
            ]}
          >
            Price: High → Low
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* =================================================
          PRODUCT HEADING
      ================================================= */}

      <View style={styles.productHeadingRow}>
        <Text style={styles.heading}>
          {selectedCategory === "All"
            ? "All Products"
            : selectedCategory}
        </Text>

        <Text style={styles.resultCount}>
          {sortedProducts.length} items
        </Text>
      </View>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      {sortedProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            🔍
          </Text>

          <Text style={styles.emptyTitle}>
            No products found
          </Text>

          <Text style={styles.emptyText}>
            Try another search or category.
          </Text>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={resetFilters}
          >
            <Text style={styles.clearText}>
              Clear Filters
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        sortedProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            activeOpacity={0.8}
            onPress={() =>
              openProduct(product)
            }
          >
            {/* REAL IMAGE */}

            <View
              style={styles.productImageContainer}
            >
              <Image
                source={product.image}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>

            {/* PRODUCT INFORMATION */}

            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {product.name}
              </Text>

              <Text style={styles.productCategory}>
                {product.category}
              </Text>

              <Text style={styles.weight}>
                {product.weight}
              </Text>

              <Text style={styles.price}>
                ₹{product.price}
              </Text>
            </View>

            {/* ADD */}

            <TouchableOpacity
              style={styles.addButton}
              onPress={(event) => {
                event.stopPropagation();
                openProduct(product);
              }}
            >
              <Text style={styles.addText}>
                ADD
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
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

  // HEADER

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D32F2F",
  },

  location: {
    color: "#555555",
    marginTop: 5,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFF3F3",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  icon: {
    fontSize: 24,
  },

  // CART BADGE

  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#D32F2F",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  // SEARCH

  search: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  // BANNER

  banner: {
    backgroundColor: "#FFEBEE",
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
  },

  bannerTitle: {
    color: "#D32F2F",
    fontSize: 24,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#555555",
    marginTop: 8,
  },

  // HEADING

  heading: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
  },

  // CATEGORY

  category: {
    width: 110,
    height: 110,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 6,
  },

  selectedCategory: {
    backgroundColor: "#FFF3F3",
    borderColor: "#D32F2F",
  },

  categoryIcon: {
    fontSize: 35,
  },

  categoryText: {
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },

  selectedCategoryText: {
    color: "#D32F2F",
    fontWeight: "bold",
  },

  // SORT

  sortHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reset: {
    color: "#D32F2F",
    fontWeight: "bold",
  },

  sortContainer: {
    marginBottom: 15,
  },

  sortButton: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },

  activeSortButton: {
    backgroundColor: "#D32F2F",
    borderColor: "#D32F2F",
  },

  sortText: {
    color: "#555555",
    fontWeight: "600",
  },

  activeSortText: {
    color: "#FFFFFF",
  },

  // PRODUCT HEADING

  productHeadingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultCount: {
    color: "#777777",
  },

  // PRODUCT CARD

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },

  // PRODUCT IMAGE

  productImageContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  // PRODUCT INFO

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 17,
    fontWeight: "bold",
  },

  productCategory: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  weight: {
    color: "#777777",
    marginTop: 4,
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  // ADD

  addButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  addText: {
    color: "#D32F2F",
    fontWeight: "bold",
  },

  // EMPTY

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyIcon: {
    fontSize: 45,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyText: {
    color: "#777777",
    marginTop: 7,
  },

  clearButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  clearText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});