import { useState } from 'react';
import './App.css';
import Browser from './components/Browser';

export default function App() {
  const [mode, setMode] = useState("")
  const modes = ["", "card", "file", "folder"]

  function modAction(data) {
    console.log("pouet", data)
  }

  return (
    <>
      {modes.map(m => <button key={m} disabled={mode === m} onClick={() => setMode(m)}>{m}</button>)}
      {mode !== "" && <Browser mode={mode} openSelection={modAction} connectors={[{ id: "12345", config: {} }]} />}
    </>
  );
}