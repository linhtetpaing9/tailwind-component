export interface FormFields {
    name: string
    country: {
        key: string
        value: string
    }
    latitude: string
    longitude: string
    address_line_1: string
    postcode: string
    addresses:
        | {
              key: string
          }[]
        | null
}
