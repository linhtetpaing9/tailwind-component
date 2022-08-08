// working in progres
interface TableProps {
    loading: boolean
}

const Table = ({ loading }: TableProps) => {
    return (
        <table
            className="min-w-full border-separate"
            style={{ borderSpacing: 0 }}
        >
            <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-6 lg:pl-8 uppercase tracking-wider"
                    >
                        No
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 sm:table-cell uppercase tracking-wider pl-8"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-500 backdrop-filter uppercase tracking-wider"
                    ></th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {/* {rows
                    .map((workshop, indx) => (
                        <tr
                            className={classNames(
                                workshop.id === +id
                                    ? "after:bg-[#212936] after:opacity-5"
                                    : "",
                                "relative cursor-pointer after:absolute after:content-[''] after:w-full after:left-0 after:top-[5px] after:h-[calc(100%_-_10px)]"
                            )}
                            key={`workshop-${indx}`}
                            onClick={() =>
                                navigate(`/workshops/${workshop.id}`, {
                                    replace: true,
                                })
                            }
                        >
                            <td
                                className={classNames(
                                    indx !== people.length - 1
                                        ? "border-b border-gray-200"
                                        : "",
                                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                )}
                            >
                                {workshop.id}
                            </td>
                            <td
                                className={classNames(
                                    indx !== people.length - 1
                                        ? "border-b border-gray-200"
                                        : "",
                                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                )}
                            >
                                {workshop.name}
                            </td>
                            <td
                                className={classNames(
                                    indx !== people.length - 1
                                        ? "border-b border-gray-200"
                                        : "",
                                    "flex items-center justify-center py-4 text-sm font-medium px-2"
                                )}
                            >
                                <a className="text-indigo-600 hover:text-indigo-900 z-20">
                                    <SettingDotIcon />
                                </a>
                            </td>
                        </tr>
                    ))} */}
            </tbody>
        </table>
    )
}
