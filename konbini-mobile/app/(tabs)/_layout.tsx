import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="browse" options={{ title: "Browse" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
    </Tabs>
  );
}


