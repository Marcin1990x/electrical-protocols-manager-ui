import { apiClient } from "./ApiClient";

export const saveDataApi = () => apiClient.get(`/dbBackup`)

export const createSqlFileApi = () => apiClient.get(`/createSqlFile`)

