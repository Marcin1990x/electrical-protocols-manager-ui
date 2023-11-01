import { apiClient } from "./ApiClient";

export const retrieveMeasurementMainTypes = () => apiClient.get(`/types`)