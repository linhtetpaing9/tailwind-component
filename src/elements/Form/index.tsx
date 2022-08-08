import React, { JSXElementConstructor, ReactElement, ReactNode } from "react"
import { useFormContext, useController } from "react-hook-form"

// set proper types: rules and defaultValue
export const Field = ({
    name,
    label,
    className,
    children,
    rules,
    controllable = false,
    defaultValue,
}: {
    className?: string
    name: string
    label: string
    children: ReactElement<any, string | JSXElementConstructor<any>>
    rules?: any
    defaultValue?: any
    controllable?: boolean
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext()

    const globalRules = {
        pattern: {
            value: /^[^\s]+(?:$|.*[^\s]+$)/g,
            message: "You cannot input whitespace!",
        },
    }

    const names = name?.split(".")
    const errorField = names.reduce((acc, curr) => acc?.[curr], errors as any)

    if (!controllable) {
        return (
            <div className={className}>
                <label className="capitalize">
                    {label}{" "}
                    {rules?.required && (
                        <span className="text-sm text-red-400">*</span>
                    )}
                </label>
                {!controllable &&
                    React.cloneElement(children, {
                        ...register(name, { ...globalRules, ...rules } || {}),
                    })}
                {errorField?.type === "required" && (
                    <h4 className="text-sm text-red-400">
                        <span className="capitalize">{label} </span>
                        is required
                    </h4>
                )}
                {errorField?.type === "minLength" && (
                    <h4 className="text-sm text-red-400">
                        <span className="capitalize">{label} </span>
                        is not met the minimum length
                    </h4>
                )}
                {errorField?.type === "maxLength" && (
                    <h4 className="text-sm text-red-400">
                        <span className="capitalize">{label} </span>
                        is more than the maximum length
                    </h4>
                )}
                {errorField?.type === "pattern" && (
                    <h4 className="text-sm text-red-400">
                        {errorField?.message}
                    </h4>
                )}
            </div>
        )
    }

    const { field } = useController({
        name,
        control,
        rules: { ...globalRules, ...rules },
        defaultValue: { ...defaultValue },
    })

    return (
        <div className={className}>
            <label className="capitalize">
                {label}{" "}
                {rules?.required && (
                    <span className="text-sm text-red-400">*</span>
                )}
            </label>
            {controllable &&
                React.cloneElement(children, {
                    ...field,
                })}
            {errorField?.type === "required" && (
                <h4 className="text-sm text-red-400">
                    <span className="capitalize">{label} </span>
                    is required
                </h4>
            )}
            {errorField?.type === "minLength" && (
                <h4 className="text-sm text-red-400">
                    <span className="capitalize">{label} </span>
                    is not met the minimum length
                </h4>
            )}
            {errorField?.type === "maxLength" && (
                <h4 className="text-sm text-red-400">
                    <span className="capitalize">{label} </span>
                    is more than the maximum length
                </h4>
            )}
            {errorField?.type === "pattern" && (
                <h4 className="text-sm text-red-400">{errorField?.message}</h4>
            )}
        </div>
    )
}
