import './App.css';
import Browser from './components/Browser';

export default function App() {
  return (
    <div style={{ height: 700 }}>
      <Browser mode="folder" openSelection="" connectors={[{id: "12345", config: {}}]} />
    </div>
  );
}