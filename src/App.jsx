import { useState, useEffect } from "react";
import Header from "./components/Header";
import CollectionForm from "./components/CollectionForm";
import Summary from "./components/Summary";
import DataCard from "./components/DataCard";
import "./App.css";

export default function App() {
  const [unit, setUnit] = useState("");
  const [today, setToday] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("collections")) || {}
  );

  const [showData, setShowData] = useState(false); // 👈 NEW

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(data));
  }, [data]);

  const total = data[unit]?.total || 0;

  const handleUpdate = () => {
    if (!today) return;

    setData({
      ...data,
      [unit]: {
        today: Number(today),
        total: total + Number(today),
        date: new Date().toLocaleDateString(),
      },
    });

    setToday("");
    setShowData(false); // hide data after update
  };

  const resetUnit = (u) => {
    const newData = { ...data };
    delete newData[u];
    setData(newData);
  };

  return (
    <div className="app">
      <Header />

      <CollectionForm
        unit={unit}
        setUnit={setUnit}
        today={today}
        setToday={setToday}
        total={total}
        handleUpdate={handleUpdate}
      />

      <Summary data={data} resetUnit={resetUnit} />

      {/* SHOW DATA BUTTON */}
      <button className="show-btn" onClick={() => setShowData(true)}>
        Show Data
      </button>

      {/* DATA ONLY WHEN BUTTON CLICKED */}
      {showData && <DataCard unit={unit} data={data} />}
    </div>
  );
}