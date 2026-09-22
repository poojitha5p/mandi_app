import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    router,
    useLocalSearchParams,
} from "expo-router";

// =====================================================
// PRODUCTS WITH REAL IMAGES
// =====================================================

const products = [
  {
    id: 1,
    name: "Chicken Curry Cut",
    weight: "500g",
    price: 299,
    image: require("../../assets/images/chicken-curry-cut.jpg"),
  },
  {
    id: 2,
    name: "Chicken Breast",
    weight: "500g",
    price: 249,
    image: require("../../assets/images/chicken-breast.jpeg"),
  },
  {
    id: 3,
    name: "Fresh Fish",
    weight: "500g",
    price: 399,
    image: require("../../assets/images/fish.jpg"),
  },
  {
    id: 4,
    name: "Fresh Mutton",
    weight: "500g",
    price: 549,
    image: require("../../assets/images/mutton.png"),
  },
  {
    id: 5,
    name: "Fresh Prawns",
    weight: "500g",
    price: 449,
    image: require("../../assets/images/prawns.jpeg"),
  },
  {
    id: 6,
    name: "Farm Fresh Eggs",
    weight: "6 Pieces",
    price: 90,
    image: require("../../assets/images/eggs.jpg"),
  },
];

// =====================================================
// PRODUCTS SCREEN
// =====================================================

export default function ProductsScreen() {
  const { category } = useLocalSearchParams();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* BACK */}

      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* TITLE */}

      <Text style={styles.title}>
        {typeof category === "string"
          ? category
          : "Products"}
      </Text>

      {/* FILTERS */}

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            Filters
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>
            Sort
          </Text>
        </TouchableOpacity>
      </View>

      {/* PRODUCTS */}

      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/product-details",

              params: {
                id: String(product.id),
                name: product.name,
                weight: product.weight,
                price: String(product.price),
              },
            })
          }
        >
          {/* REAL IMAGE */}

          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* PRODUCT INFO */}

          <View style={styles.info}>
            <Text style={styles.name}>
              {product.name}
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
            style={styles.add}
            onPress={(event) => {
              event.stopPropagation();

              router.push({
                pathname: "/product-details",

                params: {
                  id: String(product.id),
                  name: product.name,
                  weight: product.weight,
                  price: String(product.price),
                },
              });
            }}
          >
            <Text style={styles.addText}>
              ADD
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  filter: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  filterText: {
    fontWeight: "600",
  },

  // PRODUCT CARD

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },

  // REAL IMAGE

  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#FFF3F3",
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  // PRODUCT INFO

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  weight: {
    color: "#777777",
    marginTop: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7,
  },

  // ADD BUTTON

  add: {
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
});