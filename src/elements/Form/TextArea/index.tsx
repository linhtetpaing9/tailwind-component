import { ChangeEventHandler, ReactNode } from "react"
import React from "react"
import { classNames } from "$app/hooks/helpers/ui"

export interface TextInputProps {
    defaultValue?: string

    prefixIcon?: ReactNode
    onChange?: ChangeEventHandler<HTMLTextAreaElement>
    className?: string
    placeholder?: string
    type?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextInputProps>(
    (props, ref) => {
        const { prefixIcon, className, placeholder, type, ...register } = props
        return (
            <div
                className={classNames(
                    className || "",
                    "flex items-center gap-2 min-h-[56px] border-2 border-[#D1D5DB]  relative w-full overflow-hidden rounded-md py-2 px-3 text-sm leading-5 text-gray-900"
                )}
            >
                {prefixIcon}
                <textarea
                    {...register}
                    ref={ref}
                    placeholder={placeholder}
                    className="w-full overflow-hidden bg-transparent border-none text-sm leading-5 text-gray-900 outline-none focus:outline-none focus:ring-0"
                />
            </div>
        )
    }
)

export default TextArea
