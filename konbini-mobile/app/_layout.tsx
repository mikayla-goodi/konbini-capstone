import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesProvider } from "./FavoritesContext";

export default function RootLayout() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites once on app launch
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem("konbini:favorites");
        if (saved) setFavorites(JSON.parse(saved));
      } catch {
        // ignore read errors for milestone
      }
    };
    loadFavorites();
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("konbini:favorites", JSON.stringify(favorites));
      } catch {
        // ignore write errors for milestone
      }
    };
    saveFavorites();
  }, [favorites]);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <FavoritesProvider value={{ favorites, toggleFavorite }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="item/[id]" />
      </Stack>
    </FavoritesProvider>
  );
}