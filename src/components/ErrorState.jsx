export default function ErrorState({ onRetry, message }) {
  return (
    <div className="error">
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        Something went wrong
      </div>
      <div style={{ color: "var(--muted)", marginBottom: 12 }}>
        {message || "Please check your connection and try again"}
      </div>
      <button className="btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
