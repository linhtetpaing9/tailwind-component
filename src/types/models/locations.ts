export type RelatedField = {
    type: string
    level: number
    url?: string
}

export type CountryField = "thailand" | "singapore" | "malaysia"

export type AddressField = "thailand" | "singapore" | "malaysia"

export type GeoLocation = {
    id: number
    name_en: string
    name_locale: string
    zipcode: string | null
    postcode: string | null
    latitude: string | number | null
    longitude: string | number | null
    type: string
    level: number
    _lft: number
    _rgt: number
    parent_id: string | number | null
    country_id: number
    created_at?: string
    updated_at?: string
}
