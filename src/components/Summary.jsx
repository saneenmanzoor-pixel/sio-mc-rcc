import { UNITS } from "../data/units";

export default function Summary({ data, resetUnit }) {
  const GRAND_TOTAL_TARGET = 240000;
  const safeData = data || {};

  // SORT BY PERCENTAGE (Area goes last)
  const sortedUnits = Object.entries(safeData).sort((a, b) => {
    const [unitA, valueA] = a;
    const [unitB, valueB] = b;

    const targetA = UNITS[unitA];
    const targetB = UNITS[unitB];

    if (!targetA && targetB) return 1;
    if (targetA && !targetB) return -1;
    if (!targetA && !targetB) return 0;

    const percentA = ((valueA?.total || 0) / targetA) * 100;
    const percentB = ((valueB?.total || 0) / targetB) * 100;

    return percentB - percentA;
  });

  // GRAND TOTAL
  const grandTotal = Object.values(safeData).reduce(
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
        <p>
          <strong>Grand Total:</strong> ₹ {grandTotal.toLocaleString()}
        </p>
        <p>
          <strong>Grand Target:</strong> ₹ {GRAND_TOTAL_TARGET.toLocaleString()}
        </p>
        <p>
          <strong>Achieved:</strong> {grandPercentage}%
        </p>
      </div>
    </div>
  );
}