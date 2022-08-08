import Toast from "$app/elements/Notification"
import { createContext, ReactNode } from "react"

export interface ToastContextProps {
    toast: any
    toastProps: any
    children?: ReactNode
}

export const ToastContext = createContext<ToastContextProps>(
    {} as ToastContextProps
)

export const ToastProvider = ({
    toast,
    toastProps,
    children,
}: ToastContextProps) => {
    return (
        <ToastContext.Provider value={{ toast, toastProps }}>
            <Toast {...toastProps} />
            {children}
        </ToastContext.Provider>
    )
}
