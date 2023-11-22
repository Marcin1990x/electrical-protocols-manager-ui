import { apiClient } from "./ApiClient";

export const addBuildingApi = (building) => apiClient.post(`/buildings`, building)

export const retrieveBuildingsApi = () => apiClient.get(`/buildings`)

export const retrieveBuildingApi = (id) => apiClient.get(`/buildings/${id}`)

export const deleteBuildingByIdApi = (id) => apiClient.delete(`/buildings/${id}`, id)

export const deleteAllBuildingsApi = () => apiClient.delete(`/buildings`)

export const addFloorToBuildingApi = (buildingId, floorId) => apiClient.put(`buildings/${buildingId}`, {}, 
{
    params: {
        floorId
    }
})

export const saveBuildingToFileApi = (projectName) => apiClient.get(`/buildings/saveToFile`,
{
    params: {
        projectName
    }
})
export const retrieveProjectsToLoadApi = () => apiClient.get(`/buildings/savedList`)

export const loadProjectApi = (projectName) => apiClient.get(`/buildings/loadFromFileToDB`,
{
    params: {
        projectName
    }
})