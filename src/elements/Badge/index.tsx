import { classNames } from "$app/hooks/helpers/ui"
import { ReactNode } from "react"

const Badge = ({
    children,
    className = "px-1 py-0.5 uppercase",
    type = "success",
}: {
    children: ReactNode
    className?: string
    type?: "warning" | "info" | "success" | "danger" | "primary" | "secondary"
}) => {
    const schema = {
        success: "bg-[#47BD0F]",
        warning: "",
        danger: "",
        primary: "",
        secondary: "bg-[#EBF4E6]",
        info: "bg-[#E8F4F8]",
    }
    return (
        <span
            className={classNames(
                `${schema[type]} ${className || "rounded-md py-0.5"}`,
                "text-xs text-white"
            )}
        >
            {children}
        </span>
    )
}

export default Badge
