import { apiClient } from "./ApiClient";

export const addMeasurementEntry = (type, entry) => apiClient.post(`${type}/entries`, entry)

export const retrieveMeasurementEntries = (type) => apiClient.get(`/${type}/entries`)

export const deleteEntryByIdApi = (type, id, mainId) => apiClient.delete(`/${type}/entries/${id}`,
{
    params: {
        mainId
    }
})
export const deleteAllEntriesApi = (type, mainId) => apiClient.delete(`/${type}/entries`,
{
    params: {
        mainId
    }
})
export const updateMeasurementEntryApi = (type, entryId,  entry) => apiClient.put(`${type}/entries/edit=${entryId}`, entry)