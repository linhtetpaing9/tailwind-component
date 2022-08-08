import { AssetParamsPayload, ParamsPayload } from "$app/types/models/params"
import { useState } from "react"
import {
    assetReq,
    stationReq,
    workshopReq,
    userReq,
} from "../services/reactQuery"
import { useDebounced } from "./useDebounced"

export const useFilter = () => {
    const initialParam = {
        per_page: 5,
        page: 1,
        sort_direction: "desc",
        sort_by: "created_at",
        q: "",
    }
    const [params, setParams] = useState<ParamsPayload>(initialParam)

    const [debounced] = useDebounced(params, 200)

    return { debounced, params, setParams }
}

export const useListParams = <P = ParamsPayload>(debounced: P) => {
    const { data, ...queryProps } = assetReq<P>({
        options: {
            keepPreviousData: true,
        },
    }).useGet(debounced)

    const meta = data?.meta
    const result = data?.data
    const totalResult = data?.meta?.total

    return { meta, result, totalResult, ...queryProps }
}

export const useWorkShopListParams = <P = ParamsPayload>(debounced: P) => {
    const { data, ...queryProps } = workshopReq<P>({
        options: {
            keepPreviousData: true,
        },
    }).useGet(debounced)

    const meta = data?.meta
    const result = data?.data
    const totalResult = data?.meta?.total

    return { meta, result, totalResult, ...queryProps }
}

export const useStationListParams = <P = ParamsPayload>(debounced: P) => {
    const { data, ...queryProps } = stationReq<P>({
        options: {
            keepPreviousData: true,
        },
    }).useGet(debounced)

    const meta = data?.meta
    const result = data?.data
    const totalResult = data?.meta?.total

    return { meta, result, totalResult, ...queryProps }
}

export const useUserListParams = <P = ParamsPayload>(debounced: P) => {
    const { data, ...queryProps } = userReq<P>({
        key: ["users", "list"],
        options: {
            keepPreviousData: true,
        },
    }).useGet(debounced)

    const meta = data?.meta
    const result = data?.data
    const totalResult = data?.meta?.total

    return { meta, result, totalResult, ...queryProps }
}
