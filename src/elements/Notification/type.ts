import { ReactElement, ReactNode } from "react"

export interface NotificationProps {
    title?: string
    description?: string

    icon?: ReactElement<any, any>

    show?: boolean
    setShow?: (show: boolean) => void

    duration?: number
}
