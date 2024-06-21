import { SERVICE_CONFIG } from "../../App";
import { ApiConfig } from "../types";

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: SERVICE_CONFIG.URL,
  timeout: 10000,
};
