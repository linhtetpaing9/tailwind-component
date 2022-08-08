import { FormFields } from "."

export interface StationFormFields extends FormFields {
    station_type_id: { key: string } | null
    workshop_id: { key: string } | null
    location_status: { key: string } | null
}
