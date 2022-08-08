import { AssetParamsPayload, ParamsPayload } from "$app/types/models/params"
import { Meta } from "$app/types/response"
import { createContext, Dispatch, SetStateAction } from "react"

export interface ListContextProps {
    params: ParamsPayload
    setParams: Dispatch<SetStateAction<ParamsPayload>>
    meta: Meta | any
}

export const ListContext = createContext<ListContextProps>(
    {} as ListContextProps
)
