import { useMemo, useState } from "react"
import { SettingDotIcon } from "$app/elements/Icons"
import Loading from "$app/elements/Loading"
import {
    useFilter,
    useWorkShopListParams,
} from "$app/hooks/actions/useListParams"
import { classNames } from "$app/hooks/helpers/ui"
import { useNavigate, useParams } from "react-router-dom"
import { ListContext } from "$app/contexts/ListContext"
import { CustomPagination } from "$app/elements/CustomPagination"
import WorkShopCreate from "./create"
import Dropdown from "$app/elements/Dropdown"

const WorkShopList = () => {
    const navigate = useNavigate()
    const { id = "" } = useParams()

    const { params, setParams, debounced } = useFilter()
    const {
        meta,
        result: workshops,
        isLoading,
    } = useWorkShopListParams(debounced)

    const listContextProviderValue = useMemo(
        () => ({ params, setParams, meta }),
        [params, setParams, meta]
    )

    return (
        <ListContext.Provider value={listContextProviderValue}>
            <WorkShopCreate />
            <div className="mt-8 flex flex-col">
                <div className="-mx-4 min-h-[400px]">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                            <table
                                className="min-w-full border-separate"
                                style={{ borderSpacing: 0 }}
                            >
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] border-b border-gray-300 bg-gray-50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6 lg:pl-8 uppercase tracking-wider"
                                        >
                                            No
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Workshop Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Stations
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 backdrop-filter uppercase tracking-wider"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {workshops
                                        ?.sort((a, b) => a.id - b.id)
                                        ?.map((workshop, indx, self) => (
                                            <tr
                                                className={classNames(
                                                    workshop.id === +id
                                                        ? "after:bg-[#212936] after:opacity-5"
                                                        : "",
                                                    "relative cursor-pointer after:absolute after:content-[''] after:w-full after:left-0 after:h-full"
                                                )}
                                                key={`workshop-${indx}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    navigate(
                                                        `/workshops/${workshop.id}`,
                                                        {
                                                            replace: true,
                                                        }
                                                    )
                                                }}
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
                                                        "whitespace-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {workshop.name}
                                                </td>

                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px] py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {workshop.str_address}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    {workshop.station_counts}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        indx !== self.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    <a className="flex text-indigo-600 hover:text-indigo-900 z-20">
                                                        <Dropdown />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {isLoading && <Loading />}
                        </div>
                    </div>
                </div>
            </div>
            <CustomPagination />
        </ListContext.Provider>
    )
}

export default WorkShopList
