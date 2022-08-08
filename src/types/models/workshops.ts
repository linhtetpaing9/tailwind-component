export interface WorkShop {
    id: number
    name: string
    station_counts: number
    str_address: string
    created_at: string
    deleted_at?: string
    updated_at: string
}

export interface WorkShopDetail {
    id: number
    latitude: string
    longitude: string
    name: string
    stations: WorkShopStation[]
    str_address: string
    country_id?: number
}

export interface StationDetail {
    id: number
    name: string
    str_address: string
    latitude: string
    longitude: string
    cases: StationCases[]
}

export interface StationCases {
    id: number
    plate_no: string
    description: string
    created_at: string
}

export interface WorkShopStation {
    address: string
    asset_counts: number
    id: number
    name: string
}
