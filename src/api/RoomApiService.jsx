import { apiClient } from "./ApiClient";

export const addRoomApi = (room) => apiClient.post(`/rooms`, room)

export const deleteRoomByIdApi = (id) => apiClient.delete(`/rooms/${id}`, id)