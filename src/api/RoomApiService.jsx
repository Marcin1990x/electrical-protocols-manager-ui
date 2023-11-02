import { apiClient } from "./ApiClient";

export const retrieveRoomApi = (id) => apiClient.get(`/rooms/${id}`)

export const addRoomApi = (room) => apiClient.post(`/rooms`, room)

export const deleteRoomByIdApi = (id, parentId) => apiClient.delete(`/rooms/${id}/${parentId}`, id, parentId)

export const addMainToRoomApi = (roomId, mainId) => apiClient.put(`rooms/${roomId}`, {}, 
{
    params: {
        mainId
    }
})