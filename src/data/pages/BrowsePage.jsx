import StoreTabs from "../../components/StoreTabs";
import ItemList from "../../components/ItemList";

export default function BrowsePage({
  stores,
  categories,
  selectedStore,
  onSelectStore,
  selectedCategory,
  onSelectCategory,
  search,
  onSearch,
  items,
  favorites,
  onToggleFavorite,
}) {
  return (
    <>
      <StoreTabs
        stores={stores}
        selectedStore={selectedStore}
        onSelectStore={onSelectStore}
      />

      <div className="row" style={{ marginTop: 10 }}>
        <span className="label">Category</span>
        <select
          className="select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <span className="label">Search</span>
        <input
          className="input"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Matcha, onigiri, melon pan…"
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <ItemList
          items={items}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </>
  );
}

