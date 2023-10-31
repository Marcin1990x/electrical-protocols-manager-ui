import { apiClient } from "./ApiClient";

export const addFloorApi = (floor) => apiClient.post(`/floors`, floor)

export const retrieveFloorsApi = () => apiClient.get(`/floors`)
export const deleteFloorByIdApi = (id, parentId) => apiClient.delete(`/floors/${id}/${parentId}`, id, parentId)

export const addRoomToFloorApi = (floorId, roomId) => apiClient.put(`floors/${floorId}`, {}, 
{
    params: {
        roomId
    }
})