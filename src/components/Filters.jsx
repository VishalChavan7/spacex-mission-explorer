import Toggle from "./Toggle.jsx";

export default function Filters({
  search,
  setSearch,
  year,
  setYear,
  successOnly,
  setSuccessOnly,
  years,
}) {
  return (
    <div className="filters">
      <input
        className="input"
        placeholder="e.g., Starlink, CRS, Demo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search by mission name"
      />
      <select
        className="select"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        aria-label="Year"
      >
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <div className="switch-cell">
        <Toggle
          checked={successOnly}
          onChange={(v) => setSuccessOnly(v)}
          label="Successful only"
        />
      </div>
    </div>
  );
}
