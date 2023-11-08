import { apiClient } from "./ApiClient";

export const retrievePdfTitlePageData = () => apiClient.get(`/titlePage`)

export const addTitlePageApi = (titlePageData) => apiClient.post(`/titlePage`, titlePageData)

export const addElectricanToTitlePageApi = (titlePageId, electricianId) => apiClient.put(`titlePage/add/${titlePageId}`, {},
{
    params: {
        electricianId
    }
})

export const removeElectricanFromTitlePageApi = (titlePageId, electricianId) => apiClient.put(`titlePage/remove/${titlePageId}`, {},
{
    params: {
        electricianId
    }
})