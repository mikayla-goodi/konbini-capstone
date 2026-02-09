import ItemList from "../../components/ItemList";

export default function FavoritesPage({
  favoriteItems,
  favorites,
  onToggleFavorite,
  topPicksByStore,
}) {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>Your Favorites</h2>
      <p style={{ opacity: 0.8 }}>
        This view will eventually become the “Top 3 per store” feature. Right
        now it’s a simple favorites list.
      </p>

      <div className="detailCard" style={{ marginTop: 10 }}>
        <div className="label">Top Picks (3 per store)</div>

        {Object.keys(topPicksByStore).length === 0 ? (
          <p className="meta" style={{ margin: "6px 0 0" }}>
            Favorite a few items to generate top picks.
          </p>
        ) : (
          Object.entries(topPicksByStore).map(([store, items]) => (
            <div key={store} style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 800 }}>{store}</div>
              <div className="meta">{items.map((i) => i.name).join(" • ")}</div>
            </div>
          ))
        )}
      </div>

      <ItemList
        items={favoriteItems}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
}
