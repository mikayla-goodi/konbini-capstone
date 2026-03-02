import { Link } from "expo-router";
import { View, Text, Pressable, FlatList } from "react-native";
import { ITEMS } from "../data/items";
import { useFavorites } from "../FavoritesContext";

export default function BrowseScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Browse</Text>
      <Text style={{ color: "#555" }}>Tap an item for details. Tap ♥ to favorite.</Text>

      <FlatList
        data={ITEMS}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => {
          const isFav = favorites.includes(item.id);

          return (
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
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      {item.name} {item.isNew ? "🆕" : ""}
                    </Text>
                    <Text style={{ color: "#666", marginTop: 4 }}>
                      {item.store} • {item.category} • {item.priceYen ? `¥${item.priceYen}` : "Price N/A"}
                    </Text>
                  </Pressable>
                </Link>
              </View>

              <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
                <Text style={{ fontSize: 18 }}>{isFav ? "♥" : "♡"}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}