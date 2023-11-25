import axios from "axios";
import { API_URL } from 'config'

class ApiController {
  constructor() {
    this.baseURL = API_URL;

    this.instance = axios.create({
      baseURL: this.baseURL,
    });
  }
  async get(endpoint, data) {
    return await this.instance.get(endpoint, {
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async post(endpoint, data) {
    return this.instance.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const API = new ApiController();

export default API;