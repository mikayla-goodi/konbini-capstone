import { Link } from "expo-router";
import { View, Text, FlatList, Pressable } from "react-native";
import { ITEMS } from "../data/items";
import { useFavorites } from "../FavoritesContext";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const favItems = ITEMS.filter((i) => favorites.includes(i.id));

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Favorites</Text>

      {favItems.length === 0 ? (
        <Text style={{ color: "#555" }}>No favorites yet — go heart a few items 💖</Text>
      ) : (
        <FlatList
          data={favItems}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 14,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1 }}>
                <Link href={`/item/${item.id}`} asChild>
                  <Pressable>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
                    <Text style={{ color: "#666", marginTop: 4 }}>
                      {item.store} • {item.category}
                    </Text>
                  </Pressable>
                </Link>
              </View>

              <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
                <Text style={{ fontSize: 18 }}>♥</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

