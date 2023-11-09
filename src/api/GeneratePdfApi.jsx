import { apiClient } from "./ApiClient";

export const getDataForProtocolApi = () => apiClient.get(`/getData`)

export const generateProtocolApi = () => apiClient.get(`/createPdf`)