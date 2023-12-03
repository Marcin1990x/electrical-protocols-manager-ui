import { apiClient } from "./ApiClient";

export const closeApplicationApi = () => apiClient.post(`/actuator/shutdown`)

export const sendHeartbeats = () => apiClient.post(`/checkHeartbeats`)