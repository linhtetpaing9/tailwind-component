import { ParentContext } from "$app/contexts/ParentContext"
import Badge from "$app/elements/Badge"
import Card from "$app/elements/Card"
import { RefrezhIcon } from "$app/elements/Icons"
import Loading from "$app/elements/Loading"
import { classNames } from "$app/hooks/helpers/ui"
import { workshopReq } from "$app/hooks/services/reactQuery"
import { useContext } from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { WorkShopDetailRes } from "../../types/response"
import WorkShopEdit from "./edit"

const WorkShop = () => {
    const params = useParams()
    const { id } = params
    const { state, dispatch } = useContext(ParentContext)
    const queryClient = useQueryClient()
    const { data, isLoading, isRefetching } = workshopReq<
        void,
        WorkShopDetailRes
    >().useShow(id)
    const workshop = data?.data
    return (
        <div className="flex flex-col bg-white h-full">
            <Card
                title={
                    <div className="bg-[#F2F4F5] flex justify-between border-b px-4 py-4 sm:px-6">
                        <h3 className=" text-lg leading-6 font-medium text-gray-900 opacity-80">
                            Workshop Information
                        </h3>
                    </div>
                }
                loading={isRefetching || isLoading}
            >
                <div className="grid grid-cols-3 place-content-center gap-4 p-8">
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Name</h3>
                        <p>{workshop?.name}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-[#6B7280] text-sm">Address</h3>
                        <p>{workshop?.str_address}</p>
                    </div>
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Lat</h3>
                        <p>{workshop?.latitude}</p>
                    </div>
                    <div>
                        <h3 className="text-[#6B7280] text-sm">Long</h3>
                        <p>{workshop?.longitude}</p>
                    </div>
                </div>
            </Card>
            <Card
                title={
                    <div className="flex justify-between border-b px-4 py-6 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 opacity-80">
                            ABCD1234 - Acivity
                            <Badge className="ml-2 px-1 py-0.5 uppercase rounded-md">
                                new
                            </Badge>
                        </h3>
                        <p
                            className="flex gap-2 cursor-pointer"
                            onClick={() => {
                                queryClient.invalidateQueries(["workshops", id])
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
                                            Station
                                        </th>
                                        <th
                                            scope="col"
                                            className="top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Station Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Total Cars
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {workshop?.stations?.map(
                                        (station, indx, self) => (
                                            <tr
                                                className={classNames(
                                                    "",
                                                    "relative after:absolute after:content-[''] after:w-full after:left-0 after:top-[5px] after:h-[calc(100%_-_10px)]"
                                                )}
                                                key={`station-${indx}`}
                                            >
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {indx + 1}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {station.name}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {station.address}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {station.asset_counts}
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

            <WorkShopEdit workshop={workshop} />
        </div>
    )
}

export default WorkShop
