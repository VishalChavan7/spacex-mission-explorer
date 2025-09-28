export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle" aria-label={label}>
      {label}
      <span
        className={`switch ${checked ? "on" : ""}`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      />
    </label>
  );
}
