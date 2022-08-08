import { useContext, useState } from "react"
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/solid"
import { useForm, FormProvider } from "react-hook-form"

import Button from "$app/elements/Button"
import TextInput from "$app/elements/Form/TextInput"
import Drawer from "$app/elements/Drawers"

import { LoadingIcon, SearchIcon } from "$app/elements/Icons"
import { Field } from "$app/elements/Form"

import AddressForm from "$components/Form/AddressForm"
import { selectReq, stationReq } from "$app/hooks/services/reactQuery"
import { useQueryClient } from "react-query"
import { ToastContext } from "$app/contexts/ToastContext"
import { convertList } from "$app/hooks/helpers/json"
import Select from "$app/elements/Form/Select"
import { StationFormFields } from "$app/types/form/station"
import TextArea from "$app/elements/Form/TextArea"
import { ParentContext } from "$app/contexts/ParentContext"
import { StationDetail } from "$app/types/models/workshops"

export interface StationPayload {
    name: string
    latitude: number
    longitude: number
    address_line_1: string
    address_line_2: string
    address_line_3: string
    postcode: string
    geo_location_id: string

    station_type_id: string
    workshop_id: string
    location_status: string
}

export default function StationEdit({ station }: { station?: StationDetail }) {
    const [isAddress, setIsAddress] = useState(true)
    const { toast } = useContext(ToastContext)
    const { state, dispatch } = useContext(ParentContext)
    const queryClient = useQueryClient()
    const methods = useForm<StationFormFields>({
        defaultValues: {
            name: "",
            country: { key: "thailand", value: "Thailand" },
            latitude: "",
            longitude: "",
            address_line_1: "",
            postcode: "",
            addresses: null,

            station_type_id: null,
            workshop_id: null,
            location_status: null,
        },
    })

    const stationMutation = stationReq<StationPayload, void>().usePut()

    const handleSubmit = methods.handleSubmit((data) => {
        const {
            name,
            longitude,
            latitude,
            address_line_1,
            postcode,
            addresses,
            station_type_id,
            workshop_id,
            location_status,
        } = data
        const filteredAddresses = addresses?.filter(
            (element) => element !== null && element !== undefined
        )
        const lastKey = (filteredAddresses?.length || 3) - 1
        const geo_location_id = filteredAddresses?.[lastKey]?.key

        const payload: StationPayload = {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address_line_1: isAddress ? address_line_1 : "",
            address_line_2: "",
            address_line_3: "",
            postcode,
            geo_location_id: geo_location_id || "",
            station_type_id: station_type_id?.key || "",
            workshop_id: workshop_id?.key || "",
            location_status: location_status?.key || "",
        }

        stationMutation.mutate(payload, {
            onSuccess: () => {
                toast({
                    duration: 5000,
                    title: "Successfully saved!",
                    description: "New station has been added!",
                    icon: (
                        <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                        />
                    ),
                })
                queryClient.invalidateQueries("stations")
                queryClient.invalidateQueries(["menu", "data"])

                methods.reset(
                    {
                        name: "",
                        latitude: "",
                        longitude: "",
                        address_line_1: "",
                        postcode: "",
                        station_type_id: null,
                        workshop_id: null,
                        location_status: null,
                    },
                    { keepErrors: true }
                )

                dispatch({ type: "cancelEdit" })
            },
            onError: (err: any) => {
                console.log({ err })
            },
        })
    })

    const { data: workshopsData } = selectReq().workshops().useGet()
    const { data: typesData } = selectReq().stationTypes().useGet()
    const { data: statusData } = selectReq().locationStatus().useGet()
    const workshops = convertList({ ...workshopsData?.data }).sort(
        (a, b) => +b.key - +a.key
    )
    const types = convertList({ ...typesData?.data })
    const status = convertList({ ...statusData?.data })
    console.log({ state })

    return (
        <Drawer
            isOpen={state.edit}
            setIsOpen={() => dispatch({ type: "cancelEdit" })}
        >
            <div className="m-auto max-w-[520px] min-w-[520px] py-10">
                <h1 className="text-black font-semibold">Create New Station</h1>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit}>
                        <AddressForm />

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
                        <div className="grid grid-cols-1 mt-4">
                            <Field
                                label="Workshop"
                                name="workshop_id"
                                rules={{ required: true }}
                                controllable
                            >
                                <Select
                                    className="border-none bg-input-color"
                                    options={workshops}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Field
                                label="Station Type"
                                name="station_type_id"
                                rules={{ required: true }}
                                controllable
                            >
                                <Select
                                    className="border-none bg-input-color"
                                    options={types}
                                />
                            </Field>
                            <Field
                                label="Location Status"
                                name="location_status"
                                rules={{ required: true }}
                                controllable
                            >
                                <Select
                                    className="border-none bg-input-color"
                                    options={status}
                                    onSelect={(value) => {
                                        if (value.key === "fixed") {
                                            setIsAddress(true)
                                        }
                                        if (value.key === "mobile") {
                                            setIsAddress(false)
                                        }
                                    }}
                                />
                            </Field>
                        </div>

                        {isAddress && (
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
                        )}
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
                                stationMutation.isLoading && (
                                    <LoadingIcon
                                        className="w-5"
                                        fill="#f7f7f7"
                                    />
                                )
                            }
                            disabled={stationMutation.isLoading}
                        >
                            Add New Station
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </Drawer>
    )
}
