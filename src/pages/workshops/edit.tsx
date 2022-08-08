import { ParentContext } from "$app/contexts/ParentContext"
import { ToastContext } from "$app/contexts/ToastContext"
import Button from "$app/elements/Button"
import Drawer from "$app/elements/Drawers"
import { Field } from "$app/elements/Form"
import TextArea from "$app/elements/Form/TextArea"
import TextInput from "$app/elements/Form/TextInput"
import { LoadingIcon } from "$app/elements/Icons"
import { uniReq, workshopReq } from "$app/hooks/services/reactQuery"
import { WorkshopFormFields } from "$app/types/form/workshop"
import { WorkShopDetail } from "$app/types/models/workshops"
import { WorkShopDetailRes } from "$app/types/response"
import AddressForm from "$components/Form/AddressForm"
import { CheckCircleIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { WorkShopPayload } from "./create"

const WorkShopEdit = ({ workshop }: { workshop?: WorkShopDetail }) => {
    const params = useParams()
    const { id } = params
    const { toast } = useContext(ToastContext)
    const { state, dispatch } = useContext(ParentContext)
    const queryClient = useQueryClient()
    const workshopMutation = workshopReq<WorkShopPayload, void>().usePut()

    const methods = useForm<WorkshopFormFields>({
        defaultValues: {
            name: workshop?.name,
            latitude: workshop?.latitude,
            longitude: workshop?.longitude,
            address_line_1: workshop?.str_address,
            // country: { key: workshop?.country_id + "" }
        },
    })
    console.log({ workshop })

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

                methods.reset({})

                dispatch({ type: "cancelEdit" })
            },
            onError: (err: any) => {
                console.log({ err })
            },
        })
    })

    return (
        <Drawer
            isOpen={state.edit}
            setIsOpen={() => dispatch({ type: "cancelEdit" })}
        >
            <div className="m-auto max-w-[520px] min-w-[520px] py-10">
                <h1 className="text-black font-semibold">Edit WorkShop {id}</h1>
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
                            Edit Workshop
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </Drawer>
    )
}

export default WorkShopEdit
