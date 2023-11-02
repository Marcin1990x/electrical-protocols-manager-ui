import { apiClient } from "./ApiClient";

export const retrieveMeasurementMainTypes = () => apiClient.get(`/types`)

export const addMeasurementMain = (type, measurement) => apiClient.post(`${type}/mains`, measurement)

export const retrieveMeasurementMainById = (id) => apiClient.get(`/measurements/${id}`)

export const addEntryToMainApi = (type, mainId, entryId) => apiClient.put(`${type}/mains/${mainId}`, {}, 
{
    params: {
        entryId
    }
})



