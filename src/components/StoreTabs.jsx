export default function StoreTabs({ stores, selectedStore, onSelectStore }) {
  return (
    <div className="row">
      <button
        type="button"
        className={`navPill ${selectedStore === "all" ? "active" : ""}`}
        onClick={() => onSelectStore("all")}
        aria-pressed={selectedStore === "all"}
      >
        All Stores
      </button>

      {stores.map((s) => (
        <button
          key={s}
          type="button"
          className={`navPill ${selectedStore === s ? "active" : ""}`}
          onClick={() => onSelectStore(s)}
          aria-pressed={selectedStore === s}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
