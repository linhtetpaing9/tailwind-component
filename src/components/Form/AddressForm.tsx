import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Field } from "$app/elements/Form"
import Select from "$app/elements/Form/Select"
import TextInput from "$app/elements/Form/TextInput"
import { convertList, splitBaseURL } from "$app/hooks/helpers/json"
import { fetchQuery, selectReq } from "$app/hooks/services/reactQuery"
import { CountryField, RelatedField } from "$app/types/models/locations"
import { AddressRes } from "$app/types/response"
import AutoComplete from "$app/elements/Form/AutoComplete"
import { LoadingIcon } from "$app/elements/Icons"
import { AnyObj } from "$app/types/select"

export interface FieldState extends RelatedField {
    parent_id?: string
}

const AddressField = ({
    country,
    field,
    setFieldState,
}: {
    country: CountryField
    field: FieldState
    setFieldState: Dispatch<SetStateAction<FieldState[]>>
}) => {
    const { resetField } = useFormContext()
    const [baseURL, url] = splitBaseURL(field.url || "")
    const MAX_LEVEL = 3
    let currentLevel = field.level
    let currentType = field.type

    const { data: options, isLoading } = fetchQuery<
        { parent_id?: string },
        AddressRes
    >({
        url,
        baseURL,
    })
        .client({
            key: [baseURL, url, country, currentType],
        })
        .useGet({
            parent_id: field?.parent_id,
        })

    const fieldOptions = convertList({ ...options?.data })

    const handleChange = (value: any) => {
        while (currentLevel < MAX_LEVEL) {
            const nextLevel = currentLevel + 1
            resetField(`addresses.${nextLevel}`)
            currentLevel = nextLevel
        }
        setFieldState((fields) => [
            ...fields.map((f) => {
                if (f.level === field.level + 1) {
                    return {
                        type: f.type,
                        level: f.level,
                        url: f.url,
                        parent_id: value.key,
                    }
                }
                return f
            }),
        ])
    }

    return (
        <Field
            label={currentType.replace("_", " ")}
            name={`addresses.${currentLevel}`}
            className="flex-1 w-[252px]"
            rules={{ required: true }}
            controllable
        >
            <AutoComplete
                className="border-none bg-input-color min-w-[252px]"
                onSelect={handleChange}
                options={fieldOptions}
                isLoading={isLoading}
            />
        </Field>
    )
}

const Address = ({
    initialValues,
}: {
    initialValues?: { country_name: string; address_levels: AnyObj }
}) => {
    const [country, setCountry] = useState<CountryField>("thailand")
    const [fieldState, setFieldState] = useState<FieldState[]>([])
    const { reset } = useFormContext()
    const BANGKOK_KEY = "89DO7Z19PQGXNWP"
    const DUSIT_KEY = "J67V4RQXD1KXEGY"

    const { data: countryRes } = selectReq().countries().useGet()
    const countries = convertList({ ...countryRes?.data })

    const { isLoading, data: fieldRes } = selectReq()
        .getRelatedFields(country)
        .useGet()
    const fields = fieldRes?.data

    useEffect(() => {
        if (fields) {
            setFieldState(
                fields.map((field) => {
                    if (field.level === 1) {
                        return {
                            ...field,
                            parent_id: BANGKOK_KEY,
                        }
                    }
                    if (field.level === 2) {
                        return {
                            ...field,
                            parent_id: DUSIT_KEY,
                        }
                    }
                    return field
                })
            )
        }
    }, [fields])

    console.log({ fieldState })

    if (isLoading)
        return (
            <div className="flex items-center h-[200px] justify-center">
                <LoadingIcon className="w-4" />
            </div>
        )

    return (
        <>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <Field
                    label="Country"
                    name="country"
                    rules={{ required: true }}
                    controllable
                >
                    <Select
                        className="border-none bg-input-color"
                        onSelect={(value) => {
                            reset({
                                country: value,
                                addresses: [null, null, null],
                            })
                            setCountry(value.key as CountryField)
                        }}
                        options={countries}
                    />
                </Field>
            </div>
            <div className="flex flex-wrap justify-between gap-4 mt-4 ">
                {fieldState?.map((field, index) => (
                    <AddressField
                        country={country}
                        field={field}
                        setFieldState={setFieldState}
                        key={`${field.level}-${index}`}
                    />
                ))}
                <Field
                    label="Postal Code"
                    name="postcode"
                    className="flex-1 min-w-[252px]"
                    rules={{ required: true, minLength: 5, maxLength: 5 }}
                >
                    <TextInput
                        className="border-none bg-input-color "
                        onChange={(e) =>
                            console.log({
                                value: e.target.value,
                            })
                        }
                        placeholder="E.g. 10xxx"
                    />
                </Field>
            </div>
        </>
    )
}

export default Address
