import config from "react-native-config";
import { APP_ENV } from "../constants/enums";
import { BASE_CONFIG } from "../services/base_config";
export const identifyServiceConfig = () => {
  try {
    console.log("Config", config);

    switch (config?.ENV) {
      case APP_ENV.DEV:
        return BASE_CONFIG.DEV;
      case APP_ENV.UAT:
        return BASE_CONFIG.UAT;
      case APP_ENV.PROD:
        return BASE_CONFIG.PROD;
      default:
        return BASE_CONFIG.DEV;
    }
  } catch (error) {
    console.log("Error", error);

    return BASE_CONFIG.DEV;
  }
};
