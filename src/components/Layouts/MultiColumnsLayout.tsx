import { Fragment, useState, ReactNode, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckCircleIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import { classNames } from "$app/hooks/helpers/ui"
import { NavLink, Outlet } from "react-router-dom"
import { menuReq, profileReq } from "$app/hooks/services/reactQuery"
import { AuthContext } from "$app/contexts/AuthContext"
import { ToastContext } from "$app/contexts/ToastContext"
import { LogoIcon } from "$app/elements/Icons"

export default function MultiColumnsLayout({
    children,
}: {
    children: ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { logout } = useContext(AuthContext)
    const { toast } = useContext(ToastContext)

    const { data } = menuReq().useGet()
    const { data: user } = profileReq().useGet()
    const menus = data?.data

    const navigation = [
        {
            name: "Assets",
            description: `${menus?.["assets"] || 0} assets`,
            href: "/products",
        },
        {
            name: "WorkShop",
            description: `${menus?.["workshops"] || 0} workshops`,
            href: "/workshops",
        },
        {
            name: "Stations",
            description: `${menus?.["stations"] || 0} stations`,
            href: "/stations",
        },
        {
            name: "Users",
            description: `${menus?.["users"] || 0} users`,
            href: "/users",
        },
    ]
    return (
        <div className="h-screen flex font-poppins">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-start px-4">
                                        <LogoIcon className="w-20 " />
                                    </div>
                                    <nav aria-label="Sidebar" className="mt-5">
                                        <div className="px-2 space-y-1">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    to={item.href}
                                                    key={item.name}
                                                    className={({
                                                        isActive,
                                                    }: {
                                                        isActive: boolean
                                                    }) =>
                                                        classNames(
                                                            isActive
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "group flex items-center p-2 text-sm font-medium rounded-md"
                                                        )
                                                    }
                                                >
                                                    {({ isActive }) => (
                                                        <>{item.name}</>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex border-t border-[#5E6A7D] p-4">
                                    <a
                                        href="#"
                                        className="flex-shrink-0 group block"
                                    >
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src={
                                                        user?.profile_photo_url ||
                                                        "https://ui-avatars.com/api/?name=A+U&color=7F9CF5&background=EBF4FF"
                                                    }
                                                    alt="profile-photo"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-primary-black">
                                                    {user?.name ||
                                                        "Whitney Francis"}
                                                </p>
                                                <p
                                                    className="text-sm font-medium text-primary-cyan"
                                                    onClick={() => {
                                                        logout()
                                                        toast({
                                                            duration: 2000,
                                                            title: "Successfully logout!",
                                                            icon: (
                                                                <CheckCircleIcon
                                                                    className="h-6 w-6 text-green-400"
                                                                    aria-hidden="true"
                                                                />
                                                            ),
                                                        })
                                                    }}
                                                >
                                                    Logout
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="z-1 hidden lg:flex lg:flex-shrink-0 lg:fixed md:inset-y-0">
                <div className="flex flex-col w-64">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col bg-primary-black">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center justify-center flex-shrink-0 px-4">
                                <LogoIcon className="w-20 " />
                            </div>
                            <nav
                                className="mt-5 flex-1 h-full"
                                aria-label="Sidebar"
                            >
                                <div className="px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <NavLink
                                            to={item.href}
                                            key={item.name}
                                            className={({
                                                isActive,
                                            }: {
                                                isActive: boolean
                                            }) =>
                                                classNames(
                                                    isActive
                                                        ? "bg-primary-cyan text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "group flex items-center px-4 py-2 text-sm font-medium rounded-md"
                                                )
                                            }
                                        >
                                            {() => (
                                                <div className="grid grid-rows-2 grid-flow-col gap-2">
                                                    <span className="text-[15px] font-semibold">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[13px] font-normal">
                                                        {item.description}
                                                    </span>
                                                </div>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-[#5E6A7D] p-4">
                            <a
                                href="#"
                                className="flex-shrink-0 w-full group block"
                            >
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-10 w-10 rounded-full"
                                            src={
                                                user?.profile_photo_url ||
                                                "https://ui-avatars.com/api/?name=A+U&color=7F9CF5&background=EBF4FF"
                                            }
                                            alt="profile-photo"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white ">
                                            {user?.name || "Whitney Francis"}
                                        </p>
                                        <p
                                            className="text-xs font-medium text-primary-cyan "
                                            onClick={() => {
                                                logout()
                                                toast({
                                                    duration: 2000,
                                                    title: "Successfully logout!",
                                                    icon: (
                                                        <CheckCircleIcon
                                                            className="h-6 w-6 text-green-400"
                                                            aria-hidden="true"
                                                        />
                                                    ),
                                                })
                                            }}
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1 lg:pl-64">
                <div className="lg:hidden">
                    <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                        <div>
                            <LogoIcon className="w-16" />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <MenuIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative z-0 flex">
                    <main className="flex-1 pt-4">
                        <div className="px-4">{children}</div>
                        <div className="w-full xl:hidden border-l border-gray-200 overflow-y-auto">
                            <Outlet />
                        </div>
                    </main>
                    <aside className="flex-1 hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto">
                        <Outlet />
                    </aside>
                </div>
            </div>
        </div>
    )
}
