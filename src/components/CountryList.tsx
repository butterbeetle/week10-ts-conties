import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/api";
import { Country } from "../types/country";
import CountryCard from "./CountryCard";

const MAX_DATA_SIZE = 250;
const DATA_PER_PAGE = 50;

function CountryList() {
  const divRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getContriesData: () => Promise<void> = async () => {
      const data: Country[] = await api.getContries();
      setCountries(data);
      setVisibleCountries(data.slice(0, DATA_PER_PAGE));
    };

    getContriesData();
  }, []);

  const moreGetCountriesData = useCallback(() => {
    // console.log("AAA", page, DATA_PER_PAGE * page, MAX_DATA_SIZE);
    if (DATA_PER_PAGE * page > MAX_DATA_SIZE) return;
    const nextPage = page + 1;

    setVisibleCountries((prev) => [
      ...prev,
      ...countries.slice(page * DATA_PER_PAGE, nextPage * DATA_PER_PAGE),
    ]);
    // console.log("BBB", page, page * DATA_PER_PAGE, nextPage * DATA_PER_PAGE);
    setPage(nextPage);
  }, [countries, page]);

  // console.log("VISIBLE___", visibleCountries);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // console.log("ENTRIES___", entries[0]);
        if (entries[0].isIntersecting) {
          moreGetCountriesData();
        }
      },
      { threshold: 0.01 }
    );

    const currentDiv = divRef.current;

    if (currentDiv && visibleCountries.length) {
      obs.observe(currentDiv);
    }

    return () => {
      if (currentDiv) {
        obs.unobserve(currentDiv);
      }
    };
  }, [moreGetCountriesData, visibleCountries]);

  const selectedCountiesHandler: (country: Country) => void = (
    country: Country
  ) => {
    setVisibleCountries((prev) =>
      prev?.map((c) => (c.cca2 === country.cca2 ? { ...c, selected: true } : c))
    );
    setSelectedCountries((prev) => [...(prev || []), country]);
  };

  const unSelectedCountiesHandler: (country: Country) => void = (
    country: Country
  ) => {
    setVisibleCountries((prev) =>
      prev?.map((c) =>
        c.cca2 === country.cca2 ? { ...c, selected: false } : c
      )
    );

    setSelectedCountries((prev) =>
      prev?.filter((c) => c.cca2 !== country.cca2)
    );
  };

  // console.log("countries___", countries);

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
          {visibleCountries
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
      <div ref={divRef} className="bg-[#f0f0f0] h-10 w-full" />
    </div>
  );
}

export default CountryList;
