import axios, { AxiosInstance } from "axios";
import { Country } from "../types/country";

const URL = "https://restcountries.com/v3.1";

class API {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: URL });
  }

  async getContries() {
    const response = await this.client.get<Country[]>("/all");
    const result = response.data;
    // console.log("GET DATA___", result);

    return result;
  }
}

const api = new API();

export default api;
