import { yearRange } from "$app/hooks/helpers/json"

const result = yearRange(0, 102)

export const Years = result.map((value) => ({
    key: value,
    value: value.toString(),
}))
