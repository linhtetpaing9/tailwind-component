import Badge from "$app/elements/Badge"
import Card from "$app/elements/Card"
import { BackIcon, RefrezhIcon } from "$app/elements/Icons"
import Loading from "$app/elements/Loading"
import Timeline from "$app/elements/Timeline"
import { classNames } from "$app/hooks/helpers/ui"
import { fetchQuery, stationReq } from "$app/hooks/services/reactQuery"
import { StationDetailRes, TimelineDetailRes } from "$app/types/response"
import { useEffect, useRef } from "react"
import { useQueryClient } from "react-query"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import StationEdit from "./edit"

const Station = () => {
    const navigate = useNavigate()
    const params = useParams()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const { id } = params
    const { data, isLoading, isRefetching } = stationReq<
        void,
        StationDetailRes
    >().useShow(id)

    const station = data?.data
    const uuid = searchParams.get("uuid") || ""

    return (
        <div className="flex flex-col bg-white h-full">
            <Card
                title={
                    <div className="bg-[#F2F4F5] flex justify-between border-b px-4 py-4 sm:px-6">
                        <h3 className=" text-lg leading-6 font-medium text-gray-900 opacity-80">
                            Station Information
                        </h3>
                    </div>
                }
                loading={isRefetching || isLoading}
            >
                <div className="grid grid-cols-3 place-content-center gap-4 p-8">
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Name</h3>
                        <p>{station?.name}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-[#6B7280] text-sm">Address</h3>
                        <p>{station?.str_address}</p>
                    </div>
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Lat</h3>
                        <p>{station?.latitude}</p>
                    </div>
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Long</h3>
                        <p>{station?.longitude}</p>
                    </div>
                </div>
            </Card>
            {uuid ? (
                <Card
                    title={
                        <div className="bg-[#F2F4F5] flex justify-between border-b px-4 py-4 sm:px-6">
                            <h3 className="flex items-center gap-4 text-lg leading-6 font-medium text-gray-900 opacity-80">
                                <BackIcon
                                    className="w-4 cursor-pointer"
                                    onClick={() =>
                                        navigate({
                                            search: ``,
                                        })
                                    }
                                />{" "}
                                Back
                            </h3>
                        </div>
                    }
                >
                    <StationTimeline uuid={uuid} name={station?.name} />
                </Card>
            ) : (
                <Card
                    title={
                        <div className="flex justify-between border-b px-4 py-4 sm:px-6">
                            <h3 className="flex items-center text-lg leading-6 font-medium text-gray-900 opacity-80">
                                Station {station?.id}
                            </h3>
                            <p
                                className="flex gap-2 cursor-pointer"
                                onClick={() => {
                                    queryClient.invalidateQueries([
                                        "stations",
                                        id,
                                    ])
                                }}
                            >
                                <RefrezhIcon className="w-5" /> Refresh
                            </p>
                        </div>
                    }
                    loading={isRefetching || isLoading}
                >
                    <div className="flex flex-col">
                        <div className="inline-block w-full py-2 align-middle">
                            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                                <table
                                    className="min-w-full border-separate"
                                    style={{ borderSpacing: 0 }}
                                >
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="top-0 z-[100] border-b border-gray-300 bg-gray-50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6 lg:pl-8 uppercase tracking-wider"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="w-32 top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 lg:table-cell uppercase tracking-wider pl-8"
                                            >
                                                Car Plate
                                            </th>
                                            <th
                                                scope="col"
                                                className="top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                            >
                                                Car description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {station?.cases?.map(
                                            (timeline, indx, self) => (
                                                <tr
                                                    className={classNames(
                                                        timeline.id === +uuid
                                                            ? "after:bg-[#212936] after:opacity-5"
                                                            : "",
                                                        "relative cursor-pointer after:absolute after:content-[''] after:w-full after:left-0 after:top-[5px] after:h-[calc(100%_-_10px)]"
                                                    )}
                                                    key={`timeline-${indx}`}
                                                    onClick={() => {
                                                        navigate({
                                                            search: `?uuid=${timeline.id}`,
                                                        })
                                                    }}
                                                >
                                                    <td
                                                        className={classNames(
                                                            indx !==
                                                                self.length - 1
                                                                ? "border-b border-gray-200"
                                                                : "",
                                                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                        )}
                                                    >
                                                        {indx + 1}
                                                    </td>
                                                    <td
                                                        className={classNames(
                                                            indx !==
                                                                self.length - 1
                                                                ? "border-b border-gray-200"
                                                                : "",
                                                            "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                        )}
                                                    >
                                                        {timeline.plate_no}
                                                    </td>
                                                    <td
                                                        className={classNames(
                                                            indx !==
                                                                self.length - 1
                                                                ? "border-b border-gray-200"
                                                                : "",
                                                            "py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                        )}
                                                    >
                                                        {timeline.description}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                {isLoading && <Loading />}
                            </div>
                        </div>
                    </div>
                </Card>
            )}
            <StationEdit station={station} />
        </div>
    )
}

const StationTimeline = ({ uuid, name }: { uuid: string; name?: string }) => {
    const queryClient = useQueryClient()
    const ListDiv: any = useRef()

    useEffect(() => {
        setTimeout(() => {
            if (ListDiv && ListDiv.current)
                ListDiv.current.scrollTop = ListDiv.current.scrollHeight
        }, 1000)
    }, [])

    const {
        data: result,
        isLoading,
        isRefetching,
    } = fetchQuery<void, TimelineDetailRes>({
        url: `/api/v1.0/cases/${uuid}/timelines`,
    })
        .client({ key: ["cases", "timelines", uuid] })
        .useGet()
    const timelines = result?.data

    return (
        <Card
            title={
                <div className="flex justify-between border-b px-4 py-6 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 opacity-80">
                        {name || ""} - Acivity
                        <Badge className="ml-2 px-1 py-0.5 uppercase rounded-md">
                            new
                        </Badge>
                    </h3>
                    <p
                        className="flex gap-2 cursor-pointer"
                        onClick={() => {
                            queryClient.invalidateQueries([
                                "cases",
                                "timelines",
                                uuid,
                            ])
                        }}
                    >
                        <RefrezhIcon className="w-5" /> Refresh
                    </p>
                </div>
            }
            loading={isRefetching || isLoading}
        >
            <div className="py-2 max-h-[500px] overflow-y-scroll" ref={ListDiv}>
                {timelines?.map((timeline, indx, self) => (
                    <Timeline
                        key={`timeline-${indx}`}
                        {...timeline}
                        end={self.length - 1 === indx}
                    />
                ))}
            </div>
        </Card>
    )
}

export default Station
