export type APICountryType = {
  capital: string[];
  cca2: string;
  area: number;
  population: number;
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  selected: boolean;
};

export type SortType = {
  area: string;
  population: string;
};
