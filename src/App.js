import { useState } from 'react';
import './App.css';
import Browser from './components/Browser';
import { ChonkyActions } from "chonky";

export default function App() {
  const [mode, setMode] = useState("")
  const modes = ["", "card", "file", "folder"]
  return (
    <div style={{ height: 700 }}>
      {modes.map(m => <button disabled={mode === m} onClick={() => setMode(m)}>{m}</button>)}
      {mode !== "" && <Browser mode={mode} openSelection={() => console.log("Test")} connectors={[{ id: "12345", config: {} }]} />}
    </div>
  );
}