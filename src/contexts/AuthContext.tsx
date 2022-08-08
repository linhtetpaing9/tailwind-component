import { createContext } from "react"

export interface AuthContextProps {
    authenticated: boolean
    loading: boolean
    login: any
    logout: any
    setBearerToken: any
}

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
)
