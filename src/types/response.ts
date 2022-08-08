import { Asset, AssetDetail, AssetTimeline } from "./models/assets"
import { GeoLocation, RelatedField } from "./models/locations"
import { Station } from "./models/stations"
import { ProfileUser, User } from "./models/users"
import { StationDetail, WorkShop, WorkShopDetail } from "./models/workshops"
import {
    AddressSelect,
    AnySelect,
    CountrySelect,
    MakeSelect,
    ModelSelect,
    StationSelect,
    SubModelSelect,
    WorkShopSelect,
} from "./select"

export type ApiRes = {
    message: string
    status: string
    success: boolean
}
export type Meta = {
    current_page: number
    from: number
    last_page: number
    links: { url: string; label: string; active: boolean }[]
    path: string
    per_page: number
    to: number
    total: number
}

export type Pagination = {
    meta: Meta
}

export interface Options {
    [key: string]: any
}

export type MenuRes = ApiRes & {
    data: AnySelect
}

export type CountriesRes = ApiRes & {
    data: CountrySelect
}

export type WorkShopsRes = ApiRes & {
    data: WorkShopSelect
}

export type StationsRes = ApiRes & {
    data: StationSelect
}
export type AddressRes = ApiRes & {
    data: AddressSelect
}

export type ModelRes = ApiRes & {
    data: ModelSelect
}

export type MakeRes = ApiRes & {
    data: MakeSelect
}

export type SubModelRes = ApiRes & {
    data: SubModelSelect
}

export type RelatedFieldsRes = ApiRes & {
    data: RelatedField[]
}

export type GeoLocationRes = ApiRes & {
    data: GeoLocation
}

export type UserRes = ApiRes &
    Pagination & {
        data: User[]
    }
export type WorkShopRes = ApiRes &
    Pagination & {
        data: WorkShop[]
    }

export type WorkShopDetailRes = ApiRes & {
    data: WorkShopDetail
}

export type StationRes = ApiRes &
    Pagination & {
        data: Station[]
    }

export type StationDetailRes = ApiRes & {
    data: StationDetail
}

export type UserDetailRes = ApiRes & {
    data: User
}

export type ProfileUserRes = ProfileUser

export type AssetsRes = ApiRes &
    Pagination & {
        data: Asset[]
    }

export type AssetDetailRes = ApiRes & {
    data: AssetDetail
}

export type TimelineDetailRes = ApiRes & {
    data: AssetTimeline[]
}
