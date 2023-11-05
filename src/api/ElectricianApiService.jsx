import { apiClient } from "./ApiClient";

export const addElectricianApi = (electrician) => apiClient.post(`/electricians`, electrician)

export const retrieveElectriciansApi = () => apiClient.get(`/electricians`)

export const testApi = () => apiClient.get(`electricians/test`)