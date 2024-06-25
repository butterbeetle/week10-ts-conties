import { useEffect, useState } from "react";
import api from "./api/api";
import { Country } from "./types/country";

function App() {
  const [countries, setCountries] = useState<Country[]>();

  useEffect(() => {
    const getContriesData = async () => {
      const data = await api.getContries();
      setCountries(data);
    };

    getContriesData();
  }, []);

  console.log("countries___", countries);
  return (
    <main className="h-screen flex items-center justify-center">하이하이</main>
  );
}

export default App;
