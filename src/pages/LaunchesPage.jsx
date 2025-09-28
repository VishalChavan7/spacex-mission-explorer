import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchLaunches, fetchRocketsMap } from "../api.js";
import Filters from "../components/Filters.jsx";
import LaunchCard from "../components/LaunchCard.jsx";
import Modal from "../components/Modal.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingList from "../components/LoadingList.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";

const PAGE_SIZE = 9;

export default function LaunchesPage() {
  const [sp, setSp] = useSearchParams();
  const [launches, setLaunches] = useState([]);
  const [rockets, setRockets] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(sp.get("q") || "");
  const [year, setYear] = useState(sp.get("year") || "");
  const [successOnly, setSuccessOnly] = useState(sp.get("success") === "1");
  const { onlyFavorites } = useFavorites();
  const debounced = useDebounce(search, 250);
  const pageFromUrl = parseInt(sp.get("page") || "1", 10);
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    const q = new URLSearchParams(sp);
    if (debounced) q.set("q", debounced);
    else q.delete("q");
    if (year) q.set("year", year);
    else q.delete("year");
    if (successOnly) q.set("success", "1");
    else q.delete("success");
    q.set("page", String(page));
    setSp(q, { replace: true });
  }, [debounced, year, successOnly, page, setSp, sp]);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const [ls, rm] = await Promise.all([fetchLaunches(), fetchRocketsMap()]);
      setLaunches(ls);
      setRockets(rm);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const years = useMemo(() => {
    const set = new Set(
      launches.map((l) => new Date(l.date_utc).getUTCFullYear())
    );
    return [...set].sort((a, b) => b - a);
  }, [launches]);

  const filtered = useMemo(() => {
    let list = launches;
    if (sp.get("view") === "fav")
      list = list.filter((l) => onlyFavorites.has(l.id));
    if (debounced) {
      const q = debounced.toLowerCase();
      list = list.filter((l) => l.name.toLowerCase().includes(q));
    }
    if (year)
      list = list.filter(
        (l) => new Date(l.date_utc).getUTCFullYear().toString() === year
      );
    if (successOnly) list = list.filter((l) => l.success === true);
    return list;
  }, [launches, debounced, year, successOnly, onlyFavorites, sp]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(Math.max(1, page), pages);
  const pageSlice = useMemo(() => {
    const start = (clampedPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, clampedPage]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [pages, page]);

  if (loading) return <LoadingList />;
  if (error) return <ErrorState onRetry={load} message={error.message} />;
  if (!filtered.length)
    return (
      <EmptyState
        title="No missions found"
        subtitle="Try adjusting filters"
        action={
          <button
            className="btn"
            onClick={() => {
              setSearch("");
              setYear("");
              setSuccessOnly(false);
              setPage(1);
            }}
          >
            Reset
          </button>
        }
      />
    );

  return (
    <div>
      <Filters
        search={search}
        setSearch={setSearch}
        year={year}
        setYear={setYear}
        successOnly={successOnly}
        setSuccessOnly={setSuccessOnly}
        years={years}
      />
      <div className="grid" role="list">
        {pageSlice.map((l) => (
          <LaunchCard
            key={l.id}
            launch={l}
            rocketName={rockets.get(l.rocket)}
            onOpen={setSelected}
          />
        ))}
      </div>
      <Pagination
        page={clampedPage}
        pages={pages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(pages, p + 1))}
      />
      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="chips">
            <span className="chip">
              {new Date(selected.date_utc).toLocaleString()}
            </span>
            <span className="chip">
              {rockets.get(selected.rocket) || "Unknown"}
            </span>
          </div>
          <p style={{ lineHeight: 1.6 }}>
            {selected.details || "No description available."}
          </p>
          <div className="chips">
            {selected.links?.wikipedia ? (
              <a
                href={selected.links.wikipedia}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn">Wikipedia</button>
              </a>
            ) : null}
            {selected.links?.webcast ? (
              <a href={selected.links.webcast} target="_blank" rel="noreferrer">
                <button className="btn">Webcast</button>
              </a>
            ) : null}
          </div>
        </Modal>
      )}
    </div>
  );
}
