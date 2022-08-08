import { createContext, Dispatch } from "react"

export interface ParentContext {
    state: {
        edit: boolean
        delete: boolean
    }
    dispatch: Dispatch<{
        type: string
    }>
}

export const ParentContext = createContext<ParentContext>({} as ParentContext)
