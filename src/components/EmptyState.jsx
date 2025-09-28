export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="empty">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "var(--muted)", marginBottom: 12 }}>{subtitle}</div>
      {action}
    </div>
  );
}
