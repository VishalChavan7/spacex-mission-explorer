export default function Badge({ success }) {
  if (success === null || success === undefined)
    return <span className="badge">N/A</span>;
  return (
    <span className={`badge ${success ? "success" : "failure"}`}>
      {success ? "Success" : "Failure"}
    </span>
  );
}
