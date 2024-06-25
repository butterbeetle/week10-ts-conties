import { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
  onClick: (country: Country) => void;
}

function CountryCard({ country, onClick: onClickHandler }: CountryCardProps) {
  return (
    <div
      className="cursor-pointer flex flex-col gap-4 bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-[inset_0_2px_8px_gray] p-4 
divide-y-2"
      onClick={() => onClickHandler(country)}
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
    </div>
  );
}

export default CountryCard;
