import { apiClient } from "./ApiClient";

export const addRoomApi = (room) => apiClient.post(`/rooms`, room)

export const deleteRoomByIdApi = (id, parentId) => apiClient.delete(`/rooms/${id}/${parentId}`, id, parentId)