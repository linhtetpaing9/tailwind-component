import { AnyObj, GroupObj } from "$app/types/select"

export function JSONParse(str: string) {
    let result = {}
    try {
        result = JSON.parse(str)
    } catch (e) {
        result = {}
    }
    return result
}

export function isEmpty(obj: AnyObj) {
    if (obj) {
        return Object.keys(obj).length === 0
    }
    return false
}

export const convertList = (item: AnyObj) =>
    Object.entries(item).map(([key, value]) => ({
        key,
        value,
    }))

// will combine later
export const convertAssignList = (item: GroupObj) =>
    Object.entries(item).map(([key, value]) => ({
        key,
        value,
    }))

export const splitBaseURL = (url: string) => {
    const result = new URL(url)
    return [result.origin, result.pathname]
}

export function yearRange(start: number, end: number, plus?: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => i + (plus || 1920))
}
