import { Dispatch, SetStateAction, useContext, useState } from "react"
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/solid"
import { useForm, FormProvider } from "react-hook-form"

import Button from "$app/elements/Button"
import TextInput from "$app/elements/Form/TextInput"
import Drawer from "$app/elements/Drawers"

import { LoadingIcon, SearchIcon } from "$app/elements/Icons"
import { Field } from "$app/elements/Form"

import AddressForm from "$components/Form/AddressForm"
import { workshopReq } from "$app/hooks/services/reactQuery"
import { useQueryClient } from "react-query"
import { ToastContext } from "$app/contexts/ToastContext"
import { WorkshopFormFields } from "$app/types/form/workshop"
import TextArea from "$app/elements/Form/TextArea"
import { ListContext } from "$app/contexts/ListContext"

export interface WorkShopPayload {
    name: string
    latitude: number
    longitude: number
    address_line_1: string
    address_line_2: string
    address_line_3: string
    postcode: string
    geo_location_id: string
}

export default function WorkShopCreate({
    open = false,
    defaultValues = {
        name: "",
        country: { key: "thailand", value: "Thailand" },
        latitude: "",
        longitude: "",
        address_line_1: "",
        postcode: "",
        addresses: null,
    },
}: {
    open?: boolean
    defaultValues?: WorkshopFormFields
}) {
    const { setParams } = useContext(ListContext)
    const [isOpen, setIsOpen] = useState(open)
    const { toast } = useContext(ToastContext)
    const queryClient = useQueryClient()
    const methods = useForm<WorkshopFormFields>({
        defaultValues,
    })
    const workshopMutation = workshopReq<WorkShopPayload, void>().usePost()

    const handleSubmit = methods.handleSubmit((data) => {
        const {
            name,
            longitude,
            latitude,
            address_line_1,
            postcode,
            addresses,
        } = data
        const filteredAddresses = addresses?.filter(
            (element) => element !== null && element !== undefined
        )
        const lastKey = (filteredAddresses?.length || 3) - 1
        const geo_location_id = filteredAddresses?.[lastKey]?.key

        const payload: WorkShopPayload = {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address_line_1,
            address_line_2: "",
            address_line_3: "",
            postcode,
            geo_location_id: geo_location_id || "",
        }

        workshopMutation.mutate(payload, {
            onSuccess: () => {
                toast({
                    duration: 5000,
                    title: "Successfully saved!",
                    description: "New workshop has been added!",
                    icon: (
                        <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                        />
                    ),
                })
                queryClient.invalidateQueries("workshops")
                queryClient.invalidateQueries(["workshops", "select"])
                queryClient.invalidateQueries(["menu", "data"])

                methods.reset(
                    {
                        name: "",
                        latitude: "",
                        longitude: "",
                        address_line_1: "",
                        postcode: "",
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
                placeholder="Search Workshops"
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
                Add New WorkShop
            </Button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="m-auto max-w-[520px] min-w-[520px] py-10">
                    <h1 className="text-black font-semibold">
                        Create New WorkShop
                    </h1>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit}>
                            <AddressForm />
                            <div className="grid grid-cols-1 mt-4">
                                <Field
                                    label="Address"
                                    name="address_line_1"
                                    rules={{ required: true }}
                                >
                                    <TextArea
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
                            <div className="grid grid-cols-1 mt-4">
                                <Field
                                    label="Name"
                                    name="name"
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

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Field
                                    label="Lat"
                                    name="latitude"
                                    rules={{
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message:
                                                "Latitude field accept number only!",
                                        },
                                        required: true,
                                    }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. 5.40650130"
                                    />
                                </Field>
                                <Field
                                    label="Long"
                                    name="longitude"
                                    rules={{
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message:
                                                "Longitude field accept number only!",
                                        },
                                        required: true,
                                    }}
                                >
                                    <TextInput
                                        className="border-none bg-input-color"
                                        onChange={(e) =>
                                            console.log({
                                                value: e.target.value,
                                            })
                                        }
                                        placeholder="E.g. 100.25590770"
                                    />
                                </Field>
                            </div>
                            <Button
                                className="min-h-[56px] w-full mt-8"
                                type="submit"
                                prefixIcon={
                                    workshopMutation.isLoading && (
                                        <LoadingIcon
                                            className="w-5"
                                            fill="#f7f7f7"
                                        />
                                    )
                                }
                                disabled={workshopMutation.isLoading}
                            >
                                Add New Workshop
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </Drawer>
        </div>
    )
}
