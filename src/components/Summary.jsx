export default function Summary({ data, resetUnit }) {
  // SAFETY: fallback to empty object
  const GRAND_TOTAL_TARGET = 240000;
  const safeData = data || {};

  const sortedUnits = Object.entries(safeData).sort(
    (a, b) => (b[1]?.total || 0) - (a[1]?.total || 0)
  );

  const grandTotal = Object.values(data || {}).reduce(
    (sum, value) => sum + (value?.total || 0),
    0
  );

  const grandPercentage = ((grandTotal / GRAND_TOTAL_TARGET) * 100).toFixed(2);

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

      <div className="grand-total">
        <p><strong>Grand Total:</strong> ₹ {grandTotal.toLocaleString()}</p>
        <p><strong>Grand Target:</strong> ₹ {GRAND_TOTAL_TARGET.toLocaleString()}</p>
        <p><strong>Achieved:</strong> {grandPercentage}%</p>
      </div>
    </div>
  );
}