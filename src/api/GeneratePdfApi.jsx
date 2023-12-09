import { apiClient } from "./ApiClient";

export const getDataForProtocolApi = (projectName) => apiClient.get(`/getData/${projectName}`)

export const generateProtocolApi = () => apiClient.get(`/createPdf`)

export const savePdfApi = (fileName) => apiClient.get(`/saveToFile/${fileName}`)

export const getPdf = () => apiClient.get(`/file`,
    {
        responseType: 'arraybuffer'
    }
)