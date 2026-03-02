import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { ITEMS } from "../data/items";
import { useFavorites } from "../FavoritesContext";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const itemId = Number(id);

  const item = ITEMS.find((i) => i.id === itemId);

  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(itemId);

  if (!item) {
    return (
      <View style={{ flex: 1, padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Item not found</Text>
        <Link href="/(tabs)/browse" asChild>
          <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 12 }}>
            <Text>← Back to Browse</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Link href="/(tabs)/browse" asChild>
        <Pressable style={{ paddingVertical: 8 }}>
          <Text style={{ fontSize: 16 }}>← Back</Text>
        </Pressable>
      </Link>

      <Text style={{ fontSize: 24, fontWeight: "900" }}>
        {item.name} {item.isNew ? "🆕" : ""}
      </Text>

      <Text style={{ color: "#666" }}>
        {item.store} • {item.category} • {item.priceYen ? `¥${item.priceYen}` : "Price N/A"}
      </Text>

      <Pressable
        onPress={() => toggleFavorite(itemId)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 14,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          {isFav ? "♥ Favorited" : "♡ Add to Favorites"}
        </Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>
        (Optional later) Add description, tags, and reviews here.
      </Text>
    </View>
  );
}

