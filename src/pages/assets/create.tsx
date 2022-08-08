import { useContext, useState } from "react"
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/solid"
import { useForm, FormProvider } from "react-hook-form"

import Button from "$app/elements/Button"
import TextInput from "$app/elements/Form/TextInput"
import Drawer from "$app/elements/Drawers"

import { LoadingIcon, SearchIcon } from "$app/elements/Icons"
import { Field } from "$app/elements/Form"

import { assetReq, selectReq } from "$app/hooks/services/reactQuery"
import { useQueryClient } from "react-query"
import { ToastContext } from "$app/contexts/ToastContext"
import { convertList } from "$app/hooks/helpers/json"
import { Years } from "$app/placeholders/years"
import AutoComplete from "$app/elements/Form/AutoComplete"
import { AssetFormFields } from "$app/types/form/asset"
import { ListContext } from "$app/contexts/ListContext"

export interface AssetPayload {
    plate_no: string
    registration_no: string
    brand: string | number
    model: string | number
    submodel: string | number
    engine_number: string
    chassis_number: string
    year_make: string
    engine_power: string
    status: string
    type: string
    body_type: string
}

export default function AssetCreate() {
    const { setParams } = useContext(ListContext)
    const [isOpen, setIsOpen] = useState(false)
    const [makeId, setMakeId] = useState<string | number>("89DO7Z19PQGXNWP")
    const [modelId, setModelId] = useState<string | number>("89DO7Z19PQGXNWP")
    const { toast } = useContext(ToastContext)
    const queryClient = useQueryClient()

    // make
    const { data: makesData } = selectReq().makes().useGet()

    // model
    const { data: modelsData } = selectReq({ enabled: !!makeId })
        .models()
        .useGet({ vehicle_make_id: makeId })

    // submodel
    const { data: subModelsData } = selectReq({
        enabled: !!makeId && !!modelId,
    })
        .subModels()
        .useGet({ vehicle_model_id: modelId })

    const makes = convertList({ ...makesData?.data })
    const models = convertList({ ...modelsData?.data })
    const subModels = convertList({ ...subModelsData?.data })

    const status = [
        { key: "new", value: "New" },
        { key: "used", value: "Used" },
    ]

    const methods = useForm<AssetFormFields>({
        defaultValues: {
            status: null,
            year_make: null,
            brand: null,
            model: null,
            submodel: { key: "" },
        },
    })

    const assetMutation = assetReq<AssetPayload, void>().usePost()

    const handleSubmit = methods.handleSubmit((data) => {
        const {
            plate_no,
            registration_no,
            brand,
            model,
            submodel,
            engine_number,
            chassis_number,
            year_make,
            engine_power,
            status,
            type,
            body_type,
        } = data

        const payload: AssetPayload = {
            plate_no,
            registration_no,
            engine_number,
            chassis_number,
            engine_power,
            type,
            body_type,
            year_make: year_make?.value || "",
            brand: brand?.key || "",
            model: model?.key || "",
            submodel: submodel?.key || "",
            status: (status?.key as string) || "",
        }
        assetMutation.mutate(payload, {
            onSuccess: () => {
                toast({
                    duration: 5000,
                    title: "Successfully saved!",
                    description: "New asset has been added!",
                    icon: (
                        <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                        />
                    ),
                })
                queryClient.invalidateQueries("cases")
                queryClient.invalidateQueries(["menu", "data"])

                methods.reset(
                    {
                        plate_no: "",
                        registration_no: "",
                        engine_number: "",
                        chassis_number: "",
                        engine_power: "",
                        type: "",
                        body_type: "",
                        year_make: null,
                        brand: null,
                        model: null,
                        submodel: { key: "" },
                        status: null,
                    },
                    { keepErrors: true }
                )
                setIsOpen(false)
            },
            onError: (err: any) => {
                console.log({ err })
            },
        })
    })

    return (
        <div className="flex justify-between gap-4">
            <TextInput
                className=""
                placeholder="Search Assets"
                onChange={(e) =>
                    setParams((params: any) => ({
                        ...params,
                        q: e.target.value,
                    }))
                }
                prefixIcon={<SearchIcon />}
            />
            <Button
                className="w-[380px] px-8 py-4 fs-[14px]"
                prefixIcon={<PlusIcon className="w-5 mr-2" />}
                onClick={() => setIsOpen(!isOpen)}
            >
                Add New Asset
            </Button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="m-auto max-w-[520px] min-w-[520px] py-10">
                    <h1 className="text-black font-semibold">
                        Create New Asset
                    </h1>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 mt-4 gap-4">
                                <Field
                                    label="Plate No."
                                    name="plate_no"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                                <Field
                                    label="Registration No."
                                    name="registration_no"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                                <Field
                                    label="Brand"
                                    name="brand"
                                    rules={{ required: true }}
                                    controllable
                                >
                                    <AutoComplete
                                        className="border-none bg-input-color"
                                        options={makes}
                                        onSelect={(value) => {
                                            methods.resetField("model")
                                            methods.resetField("submodel")
                                            setMakeId(value?.key || "")
                                        }}
                                    />
                                </Field>
                                <Field
                                    label="Model"
                                    name="model"
                                    rules={{ required: true }}
                                    controllable
                                >
                                    <AutoComplete
                                        className="border-none bg-input-color"
                                        options={models}
                                        onSelect={(value) => {
                                            methods.resetField("submodel")
                                            setModelId(value?.key || "")
                                        }}
                                    />
                                </Field>
                                <Field
                                    label="Sub Model"
                                    name="submodel"
                                    // rules={{ required: true }}
                                    controllable
                                >
                                    <AutoComplete
                                        className="border-none bg-input-color"
                                        options={subModels}
                                    />
                                </Field>
                                <Field
                                    label="Year"
                                    name="year_make"
                                    rules={{ required: true }}
                                    controllable
                                >
                                    <AutoComplete
                                        className="border-none bg-input-color"
                                        options={Years}
                                    />
                                </Field>
                                <Field
                                    label="Engine No."
                                    name="engine_number"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                                <Field
                                    label="Chassis No."
                                    name="chassis_number"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                                <Field
                                    label="Engine Power"
                                    name="engine_power"
                                    rules={{
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message:
                                                "Engine power field accept number only!",
                                        },
                                        required: true,
                                        maxLength: 9,
                                    }}
                                >
                                    <TextInput
                                        type="number"
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                                <Field
                                    label="Status"
                                    name="status"
                                    rules={{ required: true }}
                                    controllable
                                >
                                    <AutoComplete
                                        className="border-none bg-input-color"
                                        options={status}
                                    />
                                </Field>

                                <Field
                                    label="Type"
                                    name="type"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. Civic"
                                    />
                                </Field>
                                <Field
                                    label="Body Type"
                                    name="body_type"
                                    rules={{ required: true }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. XXX,XXX"
                                    />
                                </Field>
                            </div>
                            <Button
                                className="min-h-[56px] w-full mt-8"
                                type="submit"
                                prefixIcon={
                                    assetMutation.isLoading && (
                                        <LoadingIcon
                                            className="w-5"
                                            fill="#f7f7f7"
                                        />
                                    )
                                }
                                disabled={assetMutation.isLoading}
                            >
                                Add New Asset
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </Drawer>
        </div>
    )
}
