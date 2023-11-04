import { apiClient } from "./ApiClient";

export const addElectricianApi = (electrician) => apiClient.post(`/electricians`, electrician)