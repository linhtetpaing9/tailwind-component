import { createContext } from "react"

export interface QueryContextProps {
    queryValue: any
    setQuery: any
}

export const QueryContext = createContext<QueryContextProps>(
    {} as QueryContextProps
)
