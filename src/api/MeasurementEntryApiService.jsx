import { apiClient } from "./ApiClient";

export const addMeasurementEntry = (type, entry) => apiClient.post(`${type}/entries`, entry)
