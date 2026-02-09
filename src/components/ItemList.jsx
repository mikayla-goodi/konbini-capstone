import { Link } from "react-router-dom";

function getStoreKey(store) {
  const s = (store || "").toLowerCase();
  if (s.includes("7")) return "seven";
  if (s.includes("family")) return "family";
  if (s.includes("lawson")) return "lawson";
  if (s.includes("mini")) return "ministop";
  return "generic";
}

function StoreBadge({ store }) {
  const storeKey = getStoreKey(store);

  if (storeKey === "seven") {
    return (
      <div className="storeBadge seven">
        <span className="storeDot dot-g" />
        <span className="storeDot dot-r" />
        <span className="storeDot dot-o" />
        7-Eleven
      </div>
    );
  }

  if (storeKey === "family") {
    return (
      <div className="storeBadge family">
        <span className="storeDot dot-g" />
        <span className="storeDot dot-b" />
        <span className="storeDot dot-w" />
        FamilyMart
      </div>
    );
  }

  if (storeKey === "lawson") {
    return (
      <div className="storeBadge lawson">
        <span className="storeDot dot-b" />
        <span className="storeDot dot-w" />
        Lawson
      </div>
    );
  }

  if (storeKey === "ministop") {
    return (
      <div className="storeBadge ministop">
        <span className="storeDot dot-y" />
        <span className="storeDot dot-b" />
        <span className="storeDot dot-o" />
        Ministop
      </div>
    );
  }

  return null;
}

function ItemCard({ item, isFavorited, onToggleFavorite }) {
  return (
    <li className="cardItem">
      <div className="itemTop">
        <div>
          <Link className="itemName" to={`/items/${item.id}`}>
            {item.name}
            {item.isNew ? <span className="badge">NEW</span> : null}
          </Link>

          <div className="meta">
            {item.store} • {item.category} •{" "}
            {item.priceYen ? `¥${item.priceYen}` : "Price N/A"}
          </div>

          <StoreBadge store={item.store} />
        </div>

        <button
          type="button"
          className="iconBtn"
          onClick={() => onToggleFavorite(item.id)}
          aria-label="Toggle favorite"
        >
          {isFavorited ? "♥" : "♡"}
        </button>
      </div>
    </li>
  );
}

export default function ItemList({ items, favorites, onToggleFavorite }) {
  if (!items || items.length === 0)
    return <p>No items match your filters yet.</p>;

  return (
    <ul className="grid">
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
