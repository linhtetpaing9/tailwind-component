import { GroupObj } from "../select"

export interface User {
    email: string
    id: string
    name: string
    workshops?: string[]

    roles?: { id: number; name: string }[]
    address?: string
    phone?: string
    last_checkin?: {
        station_name: string
        created_at: string
    }
    stations?: GroupObj
}

export interface ProfileUser {
    id: string
    name?: string
    email?: string
    profile_photo_url?: string
}
