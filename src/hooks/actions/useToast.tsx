import { useState } from "react"

import { CheckCircleIcon } from "@heroicons/react/outline"
import { NotificationProps } from "$app/elements/Notification/type"

const useToast = () => {
    const [toastProps, setToastProps] = useState<NotificationProps>()
    const toast = ({
        duration,
        title,
        description,
        icon,
    }: NotificationProps) => {
        const result = {
            duration: duration || 2000,
            title: title || "Successfully saved!",
            description:
                description || "Anyone with a link can now view this file",
            icon: icon,
            show: true,
            setShow: (v: boolean) => {
                setToastProps({ ...result, show: v })
            },
        }
        setToastProps(result)
        setTimeout(() => setToastProps({ ...result, show: false }), duration)
    }
    return { toastProps, setToastProps, toast }
}

export default useToast
