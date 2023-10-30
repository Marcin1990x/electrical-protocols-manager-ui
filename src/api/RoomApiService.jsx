import { apiClient } from "./ApiClient";

export const addRoomApi = (room) => apiClient.post(`/rooms`, room)