import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import { generateRandomString } from "../helpers/numbers"
import { APP_API, postApi, setApiHeaderKey } from "./axiosService"

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get("code")
    const randomStr = generateRandomString(40)

    const [cookies, setCookie, removeCookie] = useCookies(["app_token"])

    const clearParams = () =>
        window.history.pushState({}, document.title, window.location.pathname)

    const setBearerToken = (token?: string) => {
        setApiHeaderKey("Authorization", `Bearer ${token || cookies.app_token}`)
    }

    const decodeToken = (token: string) => {
        const decode: {
            access_token: string
            expires_in: number
        } = jwt_decode(token)
        return decode
    }

    const exchange = async () => {
        try {
            const data = await postApi<
                { authorization_code: string; nonce_str: string },
                { token: string }
            >({
                url: "/auth/exchange",
                payload: {
                    authorization_code: authorizationCode || "",
                    nonce_str: randomStr,
                },
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            if (data) {
                const { token } = data
                const { access_token, expires_in } = decodeToken(token)
                setBearerToken(access_token)
                setCookie("app_token", access_token, {
                    path: "/",
                    maxAge: expires_in,
                    sameSite: "none",
                    secure: true,
                })
                clearParams()
                setLoading(false)
                window.location.href = "/"
            }
        } catch (error) {}
    }

    useEffect(() => {
        if (authorizationCode) {
            setAuthenticated(true)
            exchange()
        }
    }, [])

    useEffect(() => {
        if (cookies.app_token) {
            setBearerToken(cookies.app_token)
            setLoading(false)
            setAuthenticated(true)
        }
        if (!cookies.app_token) {
            setAuthenticated(false)
            setLoading(false)
        }
    }, [cookies.app_token])

    const logout = async () => {
        const data = await postApi({
            url: "/auth/logout",
            payload: {},
            header: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        if (data) {
            removeCookie("app_token")
            setAuthenticated(false)
            window.location.href = `/`
        }
    }

    const removeToken = () => {
        removeCookie("app_token")
        window.location.href = `/`
    }

    const login = () => {
        window.location.href = `${APP_API}/auth/redirect`
    }

    return {
        authenticated,
        login,
        loading,
        logout,
        setBearerToken,
        removeToken,
    }
}
