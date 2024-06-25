import { useEffect, useState } from "react";
import api from "../api/api";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState<Country[]>();
  const [selectedCountries, setSelectedCountries] = useState<Country[]>();

  useEffect(() => {
    const getContriesData = async () => {
      const data = await api.getContries();
      setCountries(data);
    };

    getContriesData();
  }, []);

  const selectedCountiesHandler = (country: Country) => {
    setCountries((prev) =>
      prev?.map((c) => (c.cca2 === country.cca2 ? { ...c, selected: true } : c))
    );
    setSelectedCountries((prev) => [...(prev || []), country]);
  };

  const unSelectedCountiesHandler = (country: Country) => {
    setCountries((prev) =>
      prev?.map((c) =>
        c.cca2 === country.cca2 ? { ...c, selected: false } : c
      )
    );

    setSelectedCountries((prev) =>
      prev?.filter((c) => c.cca2 !== country.cca2)
    );
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center max-w-[1280px] divide-y-2 select-none">
      <section className="flex flex-col items-center gap-y-8 p-8 w-full">
        <h1 className="text-3xl font-bold">Favorite Countries</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  w-full">
          {selectedCountries?.map((country) => (
            <li
              className="border-green-500 border-2 rounded-xl m-[-1px]"
              key={country.cca2}
            >
              <CountryCard
                country={country}
                onClick={unSelectedCountiesHandler}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col items-center gap-y-8 p-8 w-full">
        <h1 className="text-3xl font-bold">Countries</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  w-full">
          {countries
            ?.filter((country) => !country.selected)
            .map((country) => (
              <li key={country.cca2}>
                <CountryCard
                  country={country}
                  onClick={selectedCountiesHandler}
                />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default CountryList;
