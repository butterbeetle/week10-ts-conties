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
    <main className="flex flex-col items-center justify-center bg-[#f0f0f0] text-[#333333]">
      <section>
        <h2 className="text-2xl font-semibold">Favorite Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="cursor-pointer bg-white rounded-md shadow-md hover:shadow-lg p-4 ">
            ddd
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-y-8 p-8">
        <h1 className="text-3xl font-bold">Countries</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries?.map(({ area, capital, flags, name }) => (
            <li key={area}>
              <div
                className="cursor-pointer flex flex-col gap-4 bg-white rounded-md shadow-md hover:shadow-lg p-4 
              divide-y-2"
              >
                <img
                  className="w-20 aspect-video mx-auto"
                  src={flags.png}
                  alt={`${area}-flag`}
                />
                <div className="flex flex-col gap-y-2 p-2">
                  <h3 className="text-xl font-semibold">{name.common}</h3>
                  <p className="text-gray-600 font-medium">{capital}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
