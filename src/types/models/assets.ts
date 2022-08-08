export interface Asset {
    current_station: string
    description: string
    plate_no: string
    total_time: number
    uuid?: string
}

export interface AssetDetail {
    uuid?: string

    body_type: string
    brand: string
    chassis_no: string
    engine_number: string
    engine_power: number
    model: string
    plate_no: string
    qr_image: string
    registration_no: string
    submodel: string
    timelines: AssetTimeline[]
}

export interface AssetTimeline {
    created_at?: string
    id: number
    station_name?: string
    station_type?: string
    total_time?: number
    user_name?: string | null
    avatar?: string
}
