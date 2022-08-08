import { ChangeEventHandler, ReactNode, useState } from "react"
import React from "react"
import { classNames } from "$app/hooks/helpers/ui"

export interface TextInputProps {
    defaultValue?: string

    parser?: any

    prefixIcon?: ReactNode
    onChange?: ChangeEventHandler<HTMLInputElement>
    className?: string
    placeholder?: string
    type?: string
}

const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "")
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (props, ref) => {
        const {
            prefixIcon,
            className,
            placeholder,
            type,
            onChange,
            ...register
        } = props
        const [value, setValue] = useState<string>("")
        return (
            <div
                className={classNames(
                    className || "",
                    "flex items-center gap-2 min-h-[56px] border-2 border-[#D1D5DB]  relative w-full overflow-hidden rounded-md py-2 px-3 text-sm leading-5 text-gray-900"
                )}
            >
                {prefixIcon}
                <input
                    // wip: numeric func
                    // value={value}
                    onChange={(e) => {
                        const v = e.currentTarget.value
                        setValue(v)
                        onChange?.(e)
                    }}
                    {...register}
                    ref={ref}
                    type={"input"}
                    placeholder={placeholder}
                    className="w-full overflow-hidden bg-transparent border-none text-sm leading-5 text-gray-900 outline-none focus:none"
                />
            </div>
        )
    }
)

export default TextInput
