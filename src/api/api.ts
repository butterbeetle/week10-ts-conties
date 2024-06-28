import axios, { AxiosInstance } from "axios";
import supabase from "../supabase/supabase";
import { APICountryType, CountryType } from "../types/country";
import { Tables } from "../types/supabase";
class API {
  private client: AxiosInstance;
  private supabase;

  constructor() {
    this.supabase = supabase;
    this.client = axios.create({ baseURL: import.meta.env.VITE_COUNTRY_URL });
  }

  async getContries(): Promise<CountryType[]> {
    const response = await this.client.get<APICountryType[]>("/all");
    const results = response.data;
    const result: CountryType[] = results.map((result) => {
      return {
        cca2: result.cca2,
        capital: result.capital?.[0],
        area: result.area,
        population: result.population,
        flags: result.flags.png,
        name: result.name.common,
        selected: false,
      };
    });
    return result;
  }

  async getSupabaseCountires() {
    const { data } = await this.supabase
      .from("country")
      .select("*")
      .returns<Tables<"country">[] | null>();
    return data;
  }

  async saveCountries(countryData: CountryType) {
    const response = await this.supabase.from("country").insert(countryData);
    return response;
  }

  async deleteCountires(cca2: string) {
    const response = await this.supabase
      .from("country")
      .delete()
      .eq("cca2", cca2);
    return response;
  }
}

const api = new API();

export default api;
