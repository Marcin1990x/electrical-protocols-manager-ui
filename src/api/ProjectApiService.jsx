import { apiClient } from "./ApiClient"

export const addProjectApi = (project) => apiClient.post(`/projects`, project)

export const deleteProjectByNameApi = (projectName) => apiClient.delete(`/projects/name=${projectName}`)

export const addBuildingToProjectApi = (projectName, buildingId) => apiClient.put(`projects/${projectName}`, {},
{
    params: {
        buildingId
    }
}
)
export const retrieveProjectsApi = () => apiClient.get(`projects`)

export const retrieveProjectByNameApi = (projectName) => apiClient.get(`/projects/name=${projectName}`)