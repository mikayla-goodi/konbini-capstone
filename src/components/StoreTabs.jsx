export default function StoreTabs({ stores, selectedStore, onSelectStore }) {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => onSelectStore("all")} aria-pressed={selectedStore === "all"}>
          All Stores
        </button>
  
        {stores.map((s) => (
          <button key={s} onClick={() => onSelectStore(s)} aria-pressed={selectedStore === s}>
            {s}
          </button>
        ))}
      </div>
    );
  }

  
  