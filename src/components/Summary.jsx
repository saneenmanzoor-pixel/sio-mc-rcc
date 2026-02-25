import { UNITS } from "../data/units";

export default function Summary({ data, resetUnit }) {
  const grandTotal = Object.values(data).reduce(
    (sum, d) => sum + d.total,
    0
  );

  return (
    <div className="summary">
      {Object.keys(UNITS).map((u) => (
        <div key={u} className="summary-row">
          <span>{u}</span>
          <span className="amount">₹ {(data[u]?.total || 0).toLocaleString()}</span>
          <button onClick={() => resetUnit(u)}>Reset</button>
        </div>
      ))}
      <h3>Grand Total: ₹ {grandTotal}</h3>
    </div>
  );
}