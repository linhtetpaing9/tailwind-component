import { CountryField } from "$app/types/models/locations"
import {
    AssetsRes,
    CountriesRes,
    MakeRes,
    ModelRes,
    Options,
    ProfileUserRes,
    RelatedFieldsRes,
    StationRes,
    SubModelRes,
    UserRes,
    WorkShopRes,
    WorkShopsRes,
} from "$app/types/response"
import { useMutation, useQuery } from "react-query"
import { StationsRes, MenuRes } from "../../types/response"
import {
    deleteApi,
    getApi,
    IHeader,
    patchApi,
    postApi,
    putApi,
} from "./axiosService"

// P -> payload or param
// T -> response
export const fetchQuery = <P = void, T = void>({
    url,
    baseURL,
    header,
}: {
    url: string
    baseURL?: string
    header?: IHeader
}) => {
    const initialOptions = {
        retry: 1,
    }
    const initialKey = url.split("/").pop()
    return {
        get(param?: P) {
            return getApi<P, T>({ url, param, baseURL })
        },
        show(id?: string | number, param?: P) {
            return getApi<P, T>({ url: `${url}/${id || ""}`, param, baseURL })
        },
        client({
            key = initialKey,
            options,
        }: {
            key?: string | string[]
            options?: Options
        }) {
            const parentSelf = this
            const combineOptions = { ...initialOptions, ...options }
            const keyResult = Array.isArray(key) ? [...key] : [key]
            return {
                filterEmpty(list: any[]) {
                    return list.filter(
                        (element) => element !== null && element !== undefined
                    )
                },
                useGet(param?: P) {
                    return useQuery(
                        this.filterEmpty([...keyResult, param]),
                        () => parentSelf.get(param),
                        combineOptions
                    )
                },
                useShow(id?: string | number, param?: P) {
                    return useQuery(
                        this.filterEmpty([...keyResult, id, param]),
                        () => parentSelf.show(id, param),
                        combineOptions
                    )
                },
                usePost() {
                    return useMutation(
                        (payload: P) =>
                            postApi<P, T>({ url, payload, baseURL, header }),
                        combineOptions
                    )
                },
                usePut(id?: string | number) {
                    return useMutation(
                        (payload: P) =>
                            putApi<P, T>({
                                url: `${url}/${id || ""}`,
                                payload,
                                header,
                            }),
                        combineOptions
                    )
                },
                usePatch(id?: string | number) {
                    return useMutation(
                        (payload: P) =>
                            patchApi<P, T>({
                                url: `${url}/${id || ""}`,
                                payload,
                                header,
                            }),
                        combineOptions
                    )
                },
                useDelete() {
                    return useMutation(
                        (id?: string | number) =>
                            deleteApi({ url: `${url}/${id || ""}` }),
                        combineOptions
                    )
                },
            }
        },
    }
}

export const selectReq = <P = void>(props = {}) => ({
    countries() {
        return fetchQuery<P, CountriesRes>({
            url: "/api/v1.0/address/countries/select",
        }).client({ key: ["countries", "select"], ...props })
    },
    workshops() {
        return fetchQuery<P, WorkShopsRes>({
            url: "/api/v1.0/workshops/select",
        }).client({ key: ["workshops", "select"], ...props })
    },
    stationTypes() {
        return fetchQuery<P, StationsRes>({
            url: "/api/v1.0/stations/types/select",
        }).client({ key: ["stationTypes", "select"], ...props })
    },
    stations() {
        return fetchQuery<P, StationsRes>({
            url: "/api/v1.0/stations/select",
        }).client({ key: ["stations", "select"], ...props })
    },
    locationStatus() {
        return fetchQuery<P, StationsRes>({
            url: "/api/v1.0/stations/location-status/select",
        }).client({ key: ["location-status", "select"], ...props })
    },
    makes() {
        return fetchQuery<P, MakeRes>({
            url: "/api/v1.0/makes/select",
        }).client({ key: ["makes", "select"], ...props })
    },
    models() {
        return fetchQuery<{ vehicle_make_id?: string | number }, ModelRes>({
            url: "/api/v1.0/models/select",
        }).client({ key: ["models", "select"], ...props })
    },
    subModels() {
        return fetchQuery<{ vehicle_model_id?: string | number }, SubModelRes>({
            url: "/api/v1.0/submodels/select",
        }).client({ key: ["submodels", "select"], ...props })
    },
    // locations
    getRelatedFields(key: CountryField) {
        return fetchQuery<P, RelatedFieldsRes>({
            url: `/api/v1.0/address/related-fields/${key}`,
        }).client(props)
    },
})

export const uniReq = <P, T>(props = { prefix: "workshops" }) => {
    const { prefix, ...rProps } = props
    return fetchQuery<P, T>({
        url: `/api/v1.0/${prefix}`,
    }).client({ ...rProps })
}

export const workshopReq = <P, T = WorkShopRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/v1.0/workshops",
    }).client(props)

export const stationReq = <P, T = StationRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/v1.0/stations",
    }).client(props)

export const userAssignStationReq = <P, T = StationRes>(
    id: string,
    props = {}
) =>
    fetchQuery<P, T>({
        url: `/api/v1.0/users/${id}/assign-stations`,
    }).client(props)

export const assetReq = <P, T = AssetsRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/v1.0/cases",
    }).client(props)

export const profileReq = <P, T = ProfileUserRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/genie-user",
    }).client(props)

export const userReq = <P, T = UserRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/v1.0/users",
    }).client(props)

export const menuReq = <P, T = MenuRes>(props = {}) =>
    fetchQuery<P, T>({
        url: "/api/v1.0/menu/data",
    }).client({ key: ["menu", "data"], ...props })
