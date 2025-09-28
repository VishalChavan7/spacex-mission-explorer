import { memo } from "react";
import { useFavorites } from "../context/FavoritesContext.jsx";

function fmt(d) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
}
function yearOf(d) {
  try {
    return new Date(d).getUTCFullYear();
  } catch {
    return "";
  }
}

function LaunchCard({ launch, rocketName, onOpen }) {
  const { isFav, toggle } = useFavorites();
  const y = yearOf(launch.date_utc);
  return (
    <article className="card" role="listitem">
      <div className="card-head">
        <div className="card-title">{launch.name}</div>
        <button
          className="btn btn-icon"
          aria-label="Toggle favorite"
          onClick={() => toggle(launch.id)}
        >
          {isFav(launch.id) ? "★" : "☆"} Favorite
        </button>
      </div>
      <div className="meta">
        {fmt(launch.date_utc)} · {rocketName || "Unknown"}
      </div>
      <div className="chips">
        <span className="chip">TBD</span>
        {y && <span className="chip">{y}</span>}
      </div>
      <div className="chips">
        <button className="btn" onClick={() => onOpen(launch)}>
          View Details
        </button>
      </div>
    </article>
  );
}

export default memo(LaunchCard);
