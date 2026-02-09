import { useState } from "react";

export default function NewView() {
  const [title, setTitle] = useState("");

  return (
    <div className="sectionCard">
      <h2 style={{ marginTop: 0 }}>New</h2>
      <p className="subtitle" style={{ marginTop: 0 }}>
        This is a cute input view for testing forms inside a routed app.
      </p>

      <div className="row" style={{ marginTop: 10 }}>
        <span className="label">Title</span>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type something..."
        />
        <button type="button" className="navPill active" onClick={() => setTitle("")}>
          Clear
        </button>
      </div>

      <p style={{ marginTop: 10 }} className="meta">
        Preview: {title || "(empty)"}
      </p>
    </div>
  );
}


