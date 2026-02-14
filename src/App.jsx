import { useEffect, useState } from "react";
import VirtualGrid from "./components/VirtualGrid";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/transactions.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data.length) return <div>Loading...</div>;

  return <VirtualGrid initialData={data} />;
}

export default App;
