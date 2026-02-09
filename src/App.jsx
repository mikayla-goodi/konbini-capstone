import { useEffect, useMemo, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
// added NavLink for active link styling
import { ITEMS, STORES, CATEGORIES } from "./data/items"; // keep for now
import StoreTabs from "./components/StoreTabs";
import ItemList from "./components/ItemList";
import ItemDetailPage from "./data/pages/ItemDetailPage";
import NewView from "./NewView";
import BrowsePage from "./data/pages/BrowsePage";
import FavoritesPage from "./data/pages/FavoritesPage";

export default function App() {
  // filter state
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  // favorites state
  // const [favorites, setFavorites] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("konbini:favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(itemId) {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }

  useEffect(() => {
    localStorage.setItem("konbini:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return ITEMS.filter((item) => {
      const storeOk =
        selectedStore === "all" ? true : item.store === selectedStore;
      const catOk =
        selectedCategory === "all" ? true : item.category === selectedCategory;
      const searchOk = q === "" ? true : item.name.toLowerCase().includes(q);

      return storeOk && catOk && searchOk;
    });
  }, [selectedStore, selectedCategory, search]);

  const favoriteItems = useMemo(() => {
    return ITEMS.filter((item) => favorites.includes(item.id));
  }, [favorites]);

  const topPicksByStore = useMemo(() => {
    const favItems = ITEMS.filter((i) => favorites.includes(i.id));
    const groups = {};

    for (const item of favItems) {
      groups[item.store] = groups[item.store] || [];
      groups[item.store].push(item);
    }

    // limit to 3 per store
    for (const store of Object.keys(groups)) {
      groups[store] = groups[store].slice(0, 3);
    }

    return groups;
  }, [favorites]);

  return (
    <div className="container">
      <div className="headerCard">
        <h1 className="title">Konbini Tracker</h1>
        <p className="subtitle">
          Browse items across 7-Eleven, Lawson, FamilyMart, and Ministop.
          Favorite items to build your “Top picks.”
        </p>

        <div className="navRow">
          <NavLink
            to="/browse"
            className={({ isActive }) => `navPill ${isActive ? "active" : ""}`}
          >
            Browse
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `navPill ${isActive ? "active" : ""}`}
          >
            Favorites ({favorites.length})
          </NavLink>

          <NavLink
            to="/new"
            className={({ isActive }) => `navPill ${isActive ? "active" : ""}`}
          >
            New
          </NavLink>
        </div>
      </div>

      <div className="sectionCard">
        <Routes>
          <Route
            path="/browse"
            element={
              <BrowsePage
                stores={STORES}
                categories={CATEGORIES}
                selectedStore={selectedStore}
                onSelectStore={setSelectedStore}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                search={search}
                onSearch={setSearch}
                items={visibleItems}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favoriteItems={favoriteItems}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                topPicksByStore={topPicksByStore}
              />
            }
          />

          <Route
            path="/items/:id"
            element={
              <ItemDetailPage
                items={ITEMS}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />

          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="*" element={<Navigate to="/browse" replace />} />
          <Route path="/new" element={<NewView />} />
        </Routes>
      </div>
    </div>
  );
}
