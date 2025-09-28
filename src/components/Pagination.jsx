export default function Pagination({ page, pages, onPrev, onNext }) {
  return (
    <div className="footer">
      <button className="btn" onClick={onPrev} disabled={page === 1}>
        Prev
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button className="btn" onClick={onNext} disabled={page === pages}>
        Next
      </button>
    </div>
  );
}
