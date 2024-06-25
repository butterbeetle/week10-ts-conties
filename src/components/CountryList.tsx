import { useEffect, useState } from "react";
import api from "../api/api";
import { Country } from "../types/country";

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
    <div className="mx-auto flex flex-col items-center justify-center max-w-[1280px] divide-y-2">
      <section className="flex flex-col items-center gap-y-8 p-8 w-full">
        <h1 className="text-3xl font-bold">Favorite Countries</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 select-none w-full">
          {selectedCountries?.map((country) => (
            <li
              className="cursor-pointer flex flex-col gap-4 bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-[inset_0_2px_8px_gray] p-4 
  divide-y-2"
              key={country.cca2}
              onClick={() => unSelectedCountiesHandler(country)}
            >
              <img
                className="w-20 aspect-video mx-auto"
                src={country.flags.png}
                alt={`${country.cca2}-flag`}
              />
              <div className="flex flex-col gap-y-2 p-2">
                <h3 className="text-xl font-semibold line-clamp-1">
                  {country.name.common}
                </h3>
                <p className="text-gray-600 font-medium">{country.capital}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col items-center gap-y-8 p-8 w-full">
        <h1 className="text-3xl font-bold">Countries</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 select-none w-full">
          {countries
            ?.filter((c) => !c.selected)
            .map((country) => (
              <li
                className="cursor-pointer flex flex-col gap-4 bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-[inset_0_2px_8px_gray] p-4 
  divide-y-2"
                key={country.cca2}
                onClick={() => selectedCountiesHandler(country)}
              >
                <img
                  className="w-20 aspect-video mx-auto"
                  src={country.flags.png}
                  alt={`${country.cca2}-flag`}
                />
                <div className="flex flex-col gap-y-2 p-2">
                  <h3 className="text-xl font-semibold line-clamp-1">
                    {country.name.common}
                  </h3>
                  <p className="text-gray-600 font-medium">{country.capital}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default CountryList;
