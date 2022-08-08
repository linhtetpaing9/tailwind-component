import { useMemo } from "react"
import { ListContext } from "$app/contexts/ListContext"
import { SettingDotIcon } from "$app/elements/Icons"
import Loading from "$app/elements/Loading"
import { classNames } from "$app/hooks/helpers/ui"
import { useNavigate, useParams } from "react-router-dom"
import AssetCreate from "./create"
import { useFilter, useListParams } from "$app/hooks/actions/useListParams"
import { CustomPagination } from "$app/elements/CustomPagination"
import Dropdown from "$app/elements/Dropdown"

const AssetList = () => {
    const navigate = useNavigate()
    const { id = "" } = useParams()

    const { params, setParams, debounced } = useFilter()
    const { meta, result: assets, isLoading } = useListParams(debounced)

    const listContextProviderValue = useMemo(
        () => ({ params, setParams, meta }),
        [params, setParams, meta]
    )

    return (
        <ListContext.Provider value={listContextProviderValue}>
            <AssetCreate />
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
                                            className="sticky w-32 top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 lg:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Car Plate
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Car description
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Total Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] hidden border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                                        >
                                            Current
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-[100] border-b border-gray-300 bg-gray-50 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 backdrop-filter uppercase tracking-wider"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {assets?.map((asset, indx, self) => (
                                        <tr
                                            className={classNames(
                                                asset.uuid === id
                                                    ? "after:bg-[#212936] after:opacity-5"
                                                    : "",
                                                "relative cursor-pointer after:absolute after:content-[''] after:w-full after:left-0 after:h-full"
                                            )}
                                            key={`asset-${indx}`}
                                            onClick={() =>
                                                navigate(
                                                    `/products/${asset.uuid}`,
                                                    {
                                                        replace: true,
                                                    }
                                                )
                                            }
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
                                                {asset.plate_no}
                                            </td>
                                            <td
                                                className={classNames(
                                                    indx !== self.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px] py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                {asset.description}
                                            </td>
                                            <td
                                                className={classNames(
                                                    indx !== self.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                {asset.total_time}
                                            </td>
                                            <td
                                                className={classNames(
                                                    indx !== self.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                {asset.current_station}
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
                                                    <SettingDotIcon className="z-20" />
                                                    {/* <Dropdown /> */}
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

export default AssetList
