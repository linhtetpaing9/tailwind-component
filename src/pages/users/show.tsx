import Badge from "$app/elements/Badge"
import Button from "$app/elements/Button"
import Card from "$app/elements/Card"
import { Field } from "$app/elements/Form"
import { CrossIcon } from "$app/elements/Icons"
import {
    selectReq,
    userAssignStationReq,
    userReq,
} from "$app/hooks/services/reactQuery"
import { UserDetailRes } from "$app/types/response"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import MultiSelect from "$app/elements/Form/MultiSelect"
import { FormProvider, useForm } from "react-hook-form"
import { convertAssignList, convertList } from "$app/hooks/helpers/json"
import { ToastContext } from "$app/contexts/ToastContext"
import { CheckCircleIcon } from "@heroicons/react/outline"
import { useQueryClient } from "react-query"
import { genieDateFormat } from "$app/hooks/helpers/numbers"

const User = () => {
    const params = useParams()
    const queryClient = useQueryClient()
    const { toast } = useContext(ToastContext)
    const { id } = params
    const { data, isLoading } = userReq<void, UserDetailRes>().useShow(id)
    const userAssignMutation = userAssignStationReq(id || "").usePost()

    const user = data?.data
    const [edit, setEdit] = useState(false)
    const { data: stationsData } = selectReq().stations().useGet()
    const stations = convertList({ ...stationsData?.data })
    const assignStations = convertAssignList({ ...user?.stations })

    const created_at = user?.last_checkin?.created_at
    const date = created_at ? new Date(created_at || "") : new Date()
    const createAt = genieDateFormat(date)

    const methods = useForm<{ assign: { key: string; value: string }[] }>({
        defaultValues: {
            assign: [],
        },
    })

    const handleSubmit = methods.handleSubmit((data) => {
        const payload = {
            station_ids: data.assign.map((a) => a.key),
        }
        userAssignMutation.mutate(payload, {
            onSuccess: () => {
                toast({
                    duration: 5000,
                    title: "Successfully assigned station!",
                    description: `${data.assign
                        .map((a) => a.value)
                        .join(", ")} is assigned!`,
                    icon: (
                        <CheckCircleIcon
                            className="h-6 w-6 text-green-400"
                            aria-hidden="true"
                        />
                    ),
                })

                queryClient.invalidateQueries(["users", id])
                queryClient.invalidateQueries(["users", "list"])
                methods.reset({})
            },
            onError: (err: any) => {
                console.log({ err })
            },
        })
    })

    return (
        <div className="flex flex-col bg-white h-full">
            <Card
                title={
                    <div className="bg-[#F2F4F5] flex justify-between border-b px-4 py-4 sm:px-6">
                        <h3 className=" text-lg leading-6 font-medium text-gray-900 opacity-80">
                            User Information
                        </h3>
                    </div>
                }
                loading={isLoading}
            >
                <div className="">
                    <div className="grid grid-cols-3 place-content-center gap-4 p-8 border-b">
                        <div>
                            <h3 className="text-[#6B7280] text-sm">Name</h3>
                            <p className="text-ellipsis overflow-hidden">
                                {user?.name}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <h3 className="text-[#6B7280] text-sm">Address</h3>
                            <p className="text-ellipsis overflow-hidden">
                                {user?.address}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">Phone</h3>
                            <p className="text-ellipsis overflow-hidden">
                                {user?.phone || "065234124"}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <h3 className="text-[#6B7280] text-sm">Email</h3>
                            <p className="text-ellipsis overflow-hidden">
                                {user?.email || "yanpainghein.ios@gmail.com"}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm mb-2">
                                Roles
                            </h3>
                            <div className="flex flex-wrap gap-2 font-medium">
                                {user?.roles?.map((role, indx) => (
                                    <Badge
                                        key={`user-role-${indx}`}
                                        type="info"
                                        className="px-2 py-1 capitalize rounded-md text-black"
                                    >
                                        {role.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {assignStations?.map((station, index) => {
                            return (
                                <div
                                    className="col-start-2 col-end-4"
                                    key={`assign-station-${index}`}
                                >
                                    <h3 className="text-[#6B7280] text-sm mb-2">
                                        {station.key}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 font-medium">
                                        {station?.value?.map((v, indx) => (
                                            <Badge
                                                key={`assign-station-value-${indx}`}
                                                type="info"
                                                className="px-2 py-1 capitalize rounded-md text-black"
                                            >
                                                {v.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="gap-4 p-8 border-b">
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Last Checkin
                            </h3>
                            <div className="flex gap-4 items-center">
                                <p>
                                    {createAt}
                                    {/* {genieDateFormat(
                                        new Date(
                                            user?.last_checkin?.created_at || ""
                                        )
                                    ) || "July 20 2022, 10:40AM"} */}
                                </p>

                                <Badge
                                    type="info"
                                    className="px-2 py-1 capitalize rounded-md text-black"
                                >
                                    {user?.last_checkin?.station_name ||
                                        "not assign"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    {!edit && (
                        <div className="p-8">
                            <Button
                                onClick={() => setEdit(true)}
                                className="w-full py-4"
                            >
                                Assign New Station
                            </Button>
                        </div>
                    )}
                    {edit && (
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit}>
                                <div className="flex-wrap justify-between flex items-end p-8 border-b gap-4">
                                    <div className="flex-1">
                                        <Field
                                            label="Assigned to"
                                            name="assign"
                                            rules={{ required: true }}
                                            controllable
                                        >
                                            <MultiSelect
                                                className="max-w-[300px] min-h-[38px] border border-gray-300"
                                                options={stations}
                                                onSelect={(value) => {
                                                    console.log({ value })
                                                }}
                                            />
                                        </Field>
                                    </div>
                                    <div className="flex gap-8 items-center">
                                        <Button className="px-12 py-2.5">
                                            Save
                                        </Button>
                                        <CrossIcon
                                            fillColor="black"
                                            onClick={() => setEdit(false)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default User
