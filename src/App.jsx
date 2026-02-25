import { useState, useEffect } from "react";
import Header from "./components/Header";
import CollectionForm from "./components/CollectionForm";
import Summary from "./components/Summary";
import DataCard from "./components/DataCard";
import "./App.css";

import { db } from "./firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default function App() {
  const [unit, setUnit] = useState("");
  const [today, setToday] = useState("");
  const [data, setData] = useState({});
  const [showData, setShowData] = useState(false);

  /* 🔥 REAL-TIME FIREBASE SYNC */
  useEffect(() => {
  const unsub = onSnapshot(doc(db, "collections", "main"), (docSnap) => {
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  });

  return () => unsub();
}, []);

  const total = data[unit]?.total || 0;

  /* ➕ ADD / UPDATE COLLECTION */
  const handleUpdate = async () => {
    if (!unit || !today) return;

    const newData = {
      ...data,
      [unit]: {
        today: Number(today),
        total: total + Number(today),
        date: new Date().toLocaleDateString(),
      },
    };

    setData(newData);
    await setDoc(doc(db, "collections", "main"), newData, { merge: true });

    setToday("");
    setShowData(false);
  };

  /* 🔁 RESET UNIT DATA */
  const resetUnit = async (unit) => {
    const confirmReset = window.confirm(
      `Are you sure you want to reset data for ${unit}?`
    );

    if (!confirmReset) return;

    const newData = { ...data };
    delete newData[unit];

    setData(newData);
    await setDoc(doc(db, "collections", "main"), newData, { merge: true });
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