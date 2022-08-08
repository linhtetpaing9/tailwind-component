export interface ParamsPayload {
    per_page?: number
    page?: number
    sort_direction?: string
    sort_by?: string
    q?: string
}

export interface AssetParamsPayload extends ParamsPayload {}
