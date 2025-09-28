const DEF_API = "https://api.spacexdata.com/v4";
const API = import.meta.env.VITE_SPACEX_BASE || DEF_API;

async function getJSON(url, init) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch(url, {
      headers: { accept: "application/json" },
      signal: ctl.signal,
      ...init,
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
    return await r.json();
  } catch (e) {
    const reason = e.name === "AbortError" ? "timeout after 10s" : e.message;
    throw new Error(`Fetch failed: ${url} → ${reason}`);
  } finally {
    clearTimeout(t);
  }
}

export async function fetchRocketsMap() {
  const rockets = await getJSON(`${API}/rockets`);
  const m = new Map();
  rockets.forEach((r) => m.set(r.id, r.name));
  return m;
}

export async function fetchLaunches() {
  const latest = await getJSON(`${API}/launches/latest`);
  return Array.isArray(latest) ? latest : [latest];
}
