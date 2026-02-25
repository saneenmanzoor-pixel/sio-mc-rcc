import { UNITS } from "../data/units";

export default function DataCard({ unit, data }) {
  if (!data[unit]) return null;

  const d = data[unit];
  const target = UNITS[unit];
  const hasTarget = typeof target === "number";
  const percentage = hasTarget
  ? ((d.total / target) * 100).toFixed(2)
  : null;
  const remaining = hasTarget ? target - d.total : null;

  const text = `
Unit: ${unit}
Target: ₹${target}
Total Collected: ₹${d.total}
Today's Collection: ₹${d.today}
Percentage: ${percentage}%
Remaining Amount: ₹${remaining}
`;

  return (
    <div className="data-card">
      <p><b>Unit:</b> {unit}</p>
      {hasTarget && (
        <>  
          <p><b>Target:</b> ₹{target}</p>
          <p><b>Percentage:</b> {percentage}%</p>
          <p><b>Remaining Amount:</b> ₹{remaining}</p>
        </>
      )}
      <p><b>Total Collected:</b> ₹{d.total}</p>
      <p><b>Today's Collection:</b> ₹{d.today}</p>
      <p><b>Percentage:</b> {percentage}%</p>
      <p><b>Remaining Amount:</b> ₹{remaining}</p>

      <button onClick={() => navigator.clipboard.writeText(text)}>
        Copy Text
      </button>
    </div>
  );
}