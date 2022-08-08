import { FieldType } from "../type"
import { useFormContext, useController } from "react-hook-form"

export interface TextInputProps extends FieldType {
    defaultValue?: string
}

const CheckBox = ({ label, name, defaultValue }: TextInputProps) => {
    const { register } = useFormContext()
    return (
        <div className="grid grid-rows-2 grid-flow-col">
            <label>{label}</label>
            <input
                {...register(name, { required: true })}
                type="checkbox"
                className="relative cursor-default overflow-hidden rounded-lg bg-white border leading-5 text-gray-900 focus:ring-black"
            />
        </div>
    )
}

export default CheckBox
