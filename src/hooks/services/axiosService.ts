import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const APP_API = import.meta.env.VITE_APP_API

const config: AxiosRequestConfig = {
    baseURL: APP_API,
    headers: {
        "X-API-TOKEN": "1e3b8ba6-694f-11ec-9563-337fe939ea01",
        "Content-Type": "application/json",
    },
}

export const axiosInstance: AxiosInstance = axios.create(config)

export const setApiHeaderKey = (name: string, value: string) => {
    axiosInstance.defaults.headers.common[name] = value
}

export interface IPayload {
    [key: string]: any
}
export interface IHeader {
    [key: string]: any
}
export interface IParam {
    [key: string]: any
}

export const getApi = <P = void, T = void>({
    url,
    baseURL,
    param,
}: {
    url: string
    baseURL?: string
    param?: P
}): Promise<T> =>
    axiosInstance
        .get<T>(url, { params: param, baseURL })
        .then(({ data }: { data: T }) => data)
        .catch((error) => Promise.reject(error?.response))

export const postApi = <P = void, T = void>({
    url,
    payload,
    baseURL,
    header,
}: {
    url: string
    payload: P
    baseURL?: string
    header?: IHeader
}): Promise<T | IPayload | IHeader> =>
    axiosInstance
        .post(url, payload, { baseURL, headers: header })
        .then(({ data }: { data: T }) => data)
        .catch((error) => Promise.reject(error?.response))

export const putApi = <P = void, T = void>({
    url,
    payload,
    baseURL,
    header,
}: {
    url: string
    payload: P
    baseURL?: string
    header?: IHeader
}): Promise<T | IPayload | IHeader> =>
    axiosInstance
        .put(url, payload, { baseURL, headers: header })
        .then(({ data }: { data: T }) => data)
        .catch((error) => Promise.reject(error?.response))

export const patchApi = <P = void, T = void>({
    url,
    payload,
    baseURL,
    header,
}: {
    url: string
    payload: P
    baseURL?: string
    header?: IHeader
}): Promise<T | IPayload | IHeader> =>
    axiosInstance
        .patch(url, payload, { baseURL, headers: header })
        .then(({ data }: { data: T }) => data)
        .catch((error) => Promise.reject(error?.response))

export const deleteApi = <T>({
    url,
}: {
    url: string
}): Promise<T | IPayload | IHeader> =>
    axiosInstance
        .delete(url)
        .then(({ data }: { data: T }) => data)
        .catch((error) => Promise.reject(error?.response))
