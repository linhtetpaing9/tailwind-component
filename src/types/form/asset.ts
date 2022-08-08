export interface AssetFormFields {
    plate_no: string
    registration_no: string
    brand: { key: string | number; value: string } | null
    model: { key: string | number; value: string } | null
    submodel: { key: string | number; value: string }
    engine_number: string
    chassis_number: string
    year_make: { key: string | number; value: string } | null
    engine_power: string
    status: { key: string | number; value: string } | null
    type: string
    body_type: string
}
