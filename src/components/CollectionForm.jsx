import { UNITS } from "../data/units";

export default function CollectionForm({
  unit,
  setUnit,
  today,
  setToday,
  total,
  handleUpdate,
}) {
  return (
    <div className="card">
      <label>Select Unit</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="" disabled>
            Select
          </option>
          {Object.keys(UNITS).map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

      <label>Target Amount (₹)</label>
      <input value={UNITS[unit]} disabled />

      <label>Total Collected (₹)</label>
      <input value={total} disabled />

      <label>Today Collected (₹)</label>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        pattern="[0-9]*"
        value={today}
        onChange={(e) => setToday(e.target.value)}
      />

      <button onClick={handleUpdate}>Add / Update</button>
    </div>
  );
}