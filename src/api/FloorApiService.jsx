import { apiClient } from "./ApiClient";

export const addFloorApi = (floor) => apiClient.post(`/floors`, floor)

export const retrieveFloorsApi = () => apiClient.get(`/floors`)