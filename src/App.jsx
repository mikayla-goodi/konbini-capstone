import { useMemo, useState } from "react";
import { ITEMS, STORES, CATEGORIES } from "./data/items";
import StoreTabs from "./components/StoreTabs";
import ItemList from "./components/ItemList";

export default function App() {
  // view switching requirement
  const [view, setView] = useState("browse"); // "browse" | "favorites"

  // filter state
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // favorites state
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(itemId) {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  }

  const visibleItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const storeOk = selectedStore === "all" ? true : item.store === selectedStore;
      const catOk = selectedCategory === "all" ? true : item.category === selectedCategory;
      return storeOk && catOk;
    });
  }, [selectedStore, selectedCategory]);

  const favoriteItems = useMemo(() => {
    return ITEMS.filter((item) => favorites.includes(item.id));
  }, [favorites]);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
      <h1 style={{ marginBottom: 6 }}>Konbini Tracker</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Browse items across 7-Eleven, Lawson, FamilyMart, and Ministop. Favorite items to create a changing “Top picks”
        list later.
      </p>

      {/* View switching */}
      <div style={{ display: "flex", gap: 10, margin: "12px 0 18px" }}>
        <button onClick={() => setView("browse")} aria-pressed={view === "browse"}>
          Browse
        </button>
        <button onClick={() => setView("favorites")} aria-pressed={view === "favorites"}>
          Favorites ({favorites.length})
        </button>
      </div>

      {view === "browse" && (
        <>
          <StoreTabs stores={STORES} selectedStore={selectedStore} onSelectStore={setSelectedStore} />

          <div style={{ marginTop: 12 }}>
            <label>
              Category:&nbsp;
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: 14 }}>
            <ItemList items={visibleItems} favorites={favorites} onToggleFavorite={toggleFavorite} />
          </div>
        </>
      )}

      {view === "favorites" && (
        <>
          <h2 style={{ marginTop: 0 }}>Your Favorites</h2>
          <p style={{ opacity: 0.8 }}>
            This view will eventually become the “Top 3 per store” feature. Right now it’s a simple favorites list.
          </p>
          <ItemList items={favoriteItems} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </>
      )}
    </div>
  );
}


