export default function Summary({ data, resetUnit }) {
  // SAFETY: fallback to empty object
  const safeData = data || {};

  const sortedUnits = Object.entries(safeData).sort(
    (a, b) => (b[1]?.total || 0) - (a[1]?.total || 0)
  );

  const grandTotal = sortedUnits.reduce(
    (sum, [, value]) => sum + (value?.total || 0),
    0
  );

  return (
    <div className="summary">
      {sortedUnits.map(([unit, value], index) => (
        <div className="summary-row" key={unit}>
          <span className="unit-name">
            {index === 0 && "🥇 "}
            {index === 1 && "🥈 "}
            {index === 2 && "🥉 "}
            {unit}
          </span>

          <span className="amount">₹ {value?.total || 0}</span>

          <button onClick={() => resetUnit(unit)}>Reset</button>
        </div>
      ))}

      <h3>Grand Total: ₹ {grandTotal}</h3>
    </div>
  );
}