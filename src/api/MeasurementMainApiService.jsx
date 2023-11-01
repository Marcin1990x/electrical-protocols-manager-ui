import { apiClient } from "./ApiClient";

export const retrieveMeasurementMainTypes = () => apiClient.get(`/types`)

export const addMeasurementMain = (type, measurement) => apiClient.post(`${type}/mains`, measurement)



