function ItemCard({ item, isFavorited, onToggleFavorite }) {
    return (
      <li style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700 }}>
              {item.name} {item.isNew ? "🆕" : ""}
            </div>
            <div style={{ fontSize: 14, opacity: 0.8 }}>
              {item.store} • {item.category} • {item.priceYen ? `¥${item.priceYen}` : "Price N/A"}
            </div>
          </div>
  
          <button onClick={() => onToggleFavorite(item.id)} aria-label="Toggle favorite">
            {isFavorited ? "♥" : "♡"}
          </button>
        </div>
      </li>
    );
  }
  
  export default function ItemList({ items, favorites, onToggleFavorite }) {
    if (items.length === 0) return <p>No items match your filters yet.</p>;
  
    return (
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            isFavorited={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    );
  }

  
