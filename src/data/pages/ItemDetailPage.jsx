import { NavLink, useParams } from "react-router-dom";

export default function ItemDetailPage({ items, favorites, onToggleFavorite }) {
  const { id } = useParams();
  const itemId = Number(id);
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="sectionCard">
        <p>Item not found.</p>
        <NavLink className="navPill active" to="/browse">
          ← Back to Browse
        </NavLink>
      </div>
    );
  }

  const isFavorited = favorites.includes(item.id);

  return (
    <div className="sectionCard">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <NavLink className="navPill" to="/browse">
          ← Back
        </NavLink>

        <button
          type="button"
          className="iconBtn"
          onClick={() => onToggleFavorite(item.id)}
          aria-label="Toggle favorite"
        >
          {isFavorited ? "♥ Favorited" : "♡ Favorite"}
        </button>
      </div>

      <h2 style={{ margin: "14px 0 6px" }}>
        {item.name} {item.isNew ? <span className="badge">NEW</span> : null}
      </h2>

      <div className="meta">
        {item.store} • {item.category} •{" "}
        {item.priceYen ? `¥${item.priceYen}` : "Price N/A"}
      </div>

      {item.description ? (
        <div className="detailCard" style={{ marginTop: 14 }}>
          <div className="label">Description</div>
          <p style={{ margin: "6px 0 0" }}>{item.description}</p>
        </div>
      ) : null}
    </div>
  );
}
