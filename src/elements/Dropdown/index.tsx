import { ListContext } from "$app/contexts/ListContext"
import { ParentContext } from "$app/contexts/ParentContext"
import { uniReq } from "$app/hooks/services/reactQuery"
import { Menu, Transition } from "@headlessui/react"
import { Fragment, useContext } from "react"
import { useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { SettingDotIcon } from "../Icons"

export default function Dropdown() {
    const { dispatch } = useContext(ParentContext)

    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center">
                        <SettingDotIcon className="z-20" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="z-[150] absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-primary-cyan text-white"
                                                : "text-gray-900"
                                        } group flex w-full items-center rounded px-2 py-2 text-sm`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            dispatch({ type: "edit" })
                                        }}
                                    >
                                        <EditIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                            fill={
                                                active ? "#00B4D8" : "#FFFFFF"
                                            }
                                            stroke={
                                                active ? "#FFFFFF" : "#00B4D8"
                                            }
                                        />
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            {/* <Menu.Item>
                                {({ active }: { active: boolean }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-primary-cyan text-white"
                                                : "text-gray-900"
                                        } group flex w-full items-center rounded px-2 py-2 text-sm`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            dispatch({ type: "delete" })
                                            // navigate(
                                            //     `/${prefix}/${id}/edit`,
                                            //     {
                                            //         replace: true,
                                            //     }
                                            // )
                                        }}
                                    >
                                        <DeleteIcon
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                            fill={
                                                active ? "#00B4D8" : "#FFFFFF"
                                            }
                                            stroke={
                                                active ? "#FFFFFF" : "#00B4D8"
                                            }
                                        />
                                        Delete (demo)
                                    </button>
                                )}
                            </Menu.Item> */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

function EditIcon({
    className,
    fill = "#FFFFFF",
    stroke = "#00B4D8",
}: {
    className: string
    fill: string
    stroke: string
}) {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill={fill}
                stroke={stroke}
                strokeWidth="2"
            />
        </svg>
    )
}

function DeleteIcon({
    className,
    fill = "#FFFFFF",
    stroke = "#00B4D8",
}: {
    className: string
    fill: string
    stroke: string
}) {
    return (
        <svg
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill={fill}
                stroke={stroke}
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke={stroke} strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke={stroke} strokeWidth="2" />
        </svg>
    )
}
