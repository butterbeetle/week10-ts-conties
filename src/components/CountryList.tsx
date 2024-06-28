import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/api";
import { SortType } from "../types/country";
import { Tables } from "../types/supabase";
import CountryCard from "./CountryCard";
import SkeletonCard from "./SkeletonCard";

const MAX_DATA_SIZE = 250;
const DATA_PER_PAGE = 50;

// 선택 후 supabase에 저장
// 불러올때

function CountryList() {
  const divRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<Tables<"country">[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Tables<"country">[]>(
    []
  );
  const [selectedCountries, setSelectedCountries] = useState<
    Tables<"country">[] | null
  >([]);

  const [sort, setSort] = useState<SortType>({
    area: "desc",
    population: "desc",
  });

  const [page, setPage] = useState<number>(1);
  // console.log("countries", countries);
  useEffect(() => {
    const getContriesData: () => Promise<void> = async () => {
      const data: Tables<"country">[] = await api.getContries();
      const supabaseData: Tables<"country">[] | null =
        await api.getSupabaseCountires();
      setCountries(data);
      setSelectedCountries(supabaseData);
      setVisibleCountries(
        data
          .slice(0, DATA_PER_PAGE)
          .filter((v) => !supabaseData?.some((s) => s.cca2 === v.cca2))
      );
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

  const selectedCountiesHandler = (country: Tables<"country">) => {
    api.saveCountries(country);
    setVisibleCountries((prev) =>
      prev?.map((c) => (c.cca2 === country.cca2 ? { ...c, selected: true } : c))
    );
    setSelectedCountries((prev) => [...(prev || []), country]);
  };

  const unSelectedCountiesHandler = (country: Tables<"country">) => {
    api.deleteCountires(country.cca2);
    // console.log(country);
    setSelectedCountries((prev) =>
      prev!.filter((c) => c.cca2 !== country.cca2)
    );

    setVisibleCountries(() =>
      countries
        .slice(0, DATA_PER_PAGE)
        .filter(
          (v) =>
            !selectedCountries
              ?.filter((c) => c.cca2 !== country.cca2)
              .some((s) => s.cca2 === v.cca2)
        )
        .map((c) => (c.cca2 === country.cca2 ? { ...c, selected: false } : c))
    );
  };

  const sortByPopulation = () => {
    if (sort.population === "desc") {
      setVisibleCountries((prev) =>
        prev.sort((a, b) => a.population - b.population)
      );
      setSort((prev) => ({ ...prev, population: "asc" }));
    } else {
      setVisibleCountries((prev) =>
        prev.sort((a, b) => b.population - a.population)
      );
      setSort((prev) => ({ ...prev, population: "desc" }));
    }
  };

  const sortByArea = () => {
    if (sort.area === "desc") {
      setVisibleCountries((prev) => prev.sort((a, b) => a.area - b.area));
      setSort((prev) => ({ ...prev, area: "asc" }));
    } else {
      setVisibleCountries((prev) => prev.sort((a, b) => b.area - a.area));
      setSort((prev) => ({ ...prev, area: "desc" }));
    }
  };

  // console.log(visibleCountries);

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
        <div className="flex flex-col w-full justify-center items-center gap-y-4">
          <h1 className="text-3xl font-bold ">Countries</h1>
          <div className="flex gap-x-2">
            <button
              onClick={sortByArea}
              className="py-1 px-2 text-xs bg-blue-400 text-white rounded 
            hover:bg-blue-500 hover:shadow-md
             active:bg-blue-600 active:shadow-[inset_0_2px_8px_gray]"
            >
              면적 {sort.area === "asc" ? "▲" : "▼"}
            </button>
            <button
              onClick={sortByPopulation}
              className="py-1 px-2 text-xs bg-blue-400 text-white rounded 
            hover:bg-blue-500 hover:shadow-md
             active:bg-blue-600 active:shadow-[inset_0_2px_8px_gray]"
            >
              인구 {sort.population === "asc" ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  w-full">
          {!countries.length &&
            Array.from({ length: 16 }).map((_, idx) => (
              <li key={idx}>
                <SkeletonCard />
              </li>
            ))}
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
