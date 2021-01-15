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
      {
        mode !== "" &&
        <Browser
          mode={mode}
          openSelection={modAction}
          connectors={[]}
          dimension={{x: 0, y:0, width: 600,height: 500}}
          darkMode={false}
        />
      }
    </>
  );
}