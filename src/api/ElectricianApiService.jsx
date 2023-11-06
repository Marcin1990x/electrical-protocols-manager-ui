import { apiClient } from "./ApiClient";

export const addElectricianApi = (electrician) => apiClient.post(`/electricians`, electrician)

export const retrieveElectriciansApi = () => apiClient.get(`/electricians`)

export const retrieveElectriciansFromFileApi = () => apiClient.get(`electricians/loadFromFile`)

export const deleteElectricianByIdApi = (id) => apiClient.delete(`/electricians/${id}`)