// ref from: https://github.com/mantinedev/mantine/blob/master/src/mantine-hooks/src/use-debounced-value/use-debounced-value.ts
import { useEffect, useState, useRef } from "react"

export function useDebounced<T = any>(
    value: T,
    wait: number,
    options = { leading: false }
) {
    const [result, setResult] = useState(value)
    const mountedRef = useRef(false)
    const timeoutRef = useRef<any>(null)
    const cooldownRef = useRef(false)

    const cancel = () => window.clearTimeout(timeoutRef.current)

    useEffect(() => {
        if (mountedRef.current) {
            if (!cooldownRef.current && options.leading) {
                cooldownRef.current = true
                setResult(value)
            } else {
                cancel()
                timeoutRef.current = window.setTimeout(() => {
                    cooldownRef.current = false
                    setResult(value)
                }, wait)
            }
        }
    }, [value, options.leading, wait])

    useEffect(() => {
        mountedRef.current = true
        return cancel
    }, [])

    return [result, cancel] as const
}
