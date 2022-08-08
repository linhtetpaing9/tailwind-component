import { classNames } from "$app/hooks/helpers/ui"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"
import { ReactNode } from "react"
import { RefrezhIcon } from "../Icons"
import { SkeletonLoading } from "../Loading"

const Collapse = ({
    children,
    title,
    loading,
    titleClassName,
    onRefreshClick,
}: {
    children: ReactNode
    title: ReactNode
    loading?: boolean
    titleClassName?: string
    onRefreshClick?: () => void
}) => {
    return (
        <Disclosure defaultOpen={true}>
            {({ open }: { open: boolean }) => (
                <div
                    className={classNames(
                        titleClassName || "bg-[#F2F4F5]",
                        "w-full"
                    )}
                >
                    <div className="flex justify-between items-center p-4 border-t">
                        {title}
                        <div className="flex gap-2">
                            <p
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={onRefreshClick}
                            >
                                Refresh
                                <RefrezhIcon className="w-5" />
                            </p>
                            <Disclosure.Button>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-black`}
                                />
                            </Disclosure.Button>
                        </div>
                    </div>
                    <Disclosure.Panel>
                        {loading ? <SkeletonLoading /> : children}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )
}

export default Collapse
