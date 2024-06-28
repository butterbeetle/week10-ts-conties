import { CountryType } from "../types/country";

interface CountryCardProps {
  country: CountryType;
  onClick: (country: CountryType) => void;
}

function CountryCard({ country, onClick: onClickHandler }: CountryCardProps) {
  return (
    <div
      className="cursor-pointer flex flex-col gap-4 bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-[inset_0_2px_8px_gray] p-4 
divide-y-2"
      onClick={() => onClickHandler(country)}
    >
      <img
        className="w-20 aspect-video mx-auto border border-gray-500"
        src={country.flags}
        alt={`${country.cca2}-flag`}
      />
      <div className="flex flex-col gap-y-2 p-2">
        <h3 className="text-xl font-semibold line-clamp-1">{country.name}</h3>
        <div className="text-xs font-bold flex gap-x-1 items-baseline divide-x-2 divide-gray-600">
          <p className="text-sm">수도</p>
          <p className="pl-1 text-gray-600">{country.capital}</p>
        </div>
        <div className="text-xs font-bold flex gap-x-1 items-baseline divide-x-2 divide-gray-600">
          <p className="text-sm">인구</p>
          <p className="pl-1 text-gray-600">
            {(country.population / 10000).toFixed(2)}만
          </p>
        </div>
        <div className="text-xs font-bold flex gap-x-1 items-baseline divide-x-2 divide-gray-600">
          <p className="text-sm">면적</p>
          <p className="pl-1 text-gray-600">
            {country.area.toLocaleString()}km²
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
