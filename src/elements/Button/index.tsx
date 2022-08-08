import { classNames } from "$app/hooks/helpers/ui"
import { ReactNode } from "react"

export interface CustomButton
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    prefixIcon?: ReactNode
}

const Button = (props: CustomButton) => {
    const { className = "", prefixIcon, children, ...rProps } = props
    return (
        <button
            {...rProps}
            className={classNames(
                className || "",
                "inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-cyan disabled:bg-gray-400 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            )}
        >
            {prefixIcon}
            {children}
        </button>
    )
}

export default Button
