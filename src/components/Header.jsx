import { useFavorites } from "../context/FavoritesContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Toggle from "./Toggle.jsx";
import { useSearchParams } from "react-router-dom";
import Spacer from "./Spacer.jsx";

export default function Header() {
  const { count } = useFavorites();
  const [sp, setSp] = useSearchParams();
  const showFav = sp.get("view") === "fav";
  const { theme, setTheme } = useTheme();
  const onToggleFav = (v) => {
    if (v) sp.set("view", "fav");
    else sp.delete("view");
    setSp(sp, { replace: true });
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="header">
      <div className="header-inner container">
        <div className="title-wrap">
          <div className="title">Atmosly • SpaceX Mission Explorer</div>
          <div className="subtitle">
            Fetching real data from the SpaceX public API (v4).
          </div>
        </div>
        <Spacer />
        <div className="grow" />
        <div className="toolbar">
          <Toggle
            checked={showFav}
            onChange={onToggleFav}
            label={`Show favorites${count ? ` (${count})` : ""}`}
          />
          <button className="btn" onClick={toggleTheme}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
