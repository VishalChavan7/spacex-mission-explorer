import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...ids]));
  }, [ids]);
  const toggle = useCallback((id) => {
    setIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);
  const isFav = useCallback((id) => ids.has(id), [ids]);
  const onlyFavorites = useMemo(() => new Set(ids), [ids]);
  const value = useMemo(
    () => ({ toggle, isFav, onlyFavorites, count: ids.size }),
    [toggle, isFav, onlyFavorites, ids]
  );
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
export function useFavorites() {
  return useContext(FavoritesContext);
}
