import { ListContext } from "$app/contexts/ListContext"
import { usePaginations } from "$app/hooks/actions/usePaginations"
import { AssetParamsPayload, ParamsPayload } from "$app/types/models/params"
import { Meta } from "$app/types/response"
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/outline"
import { useContext } from "react"
import Button from "../Button"

export function CustomPagination() {
    const { params, setParams, meta } = useContext(ListContext)
    const from = meta?.from
    const to = meta?.to
    const total = meta?.total
    const currentPage = meta?.current_page

    const showTotal = () => (
        <div className="">
            Show {from} to {to} of {total} results
        </div>
    )

    const {
        slots,
        disables,
        handlePrev,
        handleNext,
        handleEnd,
        handleStart,
        setPage,
    } = usePaginations(meta as Meta, params, setParams)

    return (
        <div
            id="h__pagination"
            className="flex justify-between py-4 items-center p-4 bg-white"
        >
            {showTotal()}
            <div className="gap-2 flex">
                <button
                    className="p-2 rounded bg-primary-cyan disabled:bg-gray-200"
                    disabled={disables.prev}
                    onClick={() => handleStart()}
                >
                    <ChevronDoubleLeftIcon className="text-white w-5" />
                </button>
                <button
                    className="p-2 rounded bg-primary-cyan disabled:bg-gray-200"
                    disabled={disables.prev}
                    onClick={() => handlePrev()}
                >
                    <ChevronLeftIcon className="text-white w-5" />
                </button>
                {slots.map((slot: number, key: number) => (
                    <span
                        className={`${
                            +slot === +currentPage &&
                            "border border-primary-cyan text-primary-cyan"
                        } flex items-center justify-center w-[32px] duration-300 border rounded py-1 cursor-pointer transition-all outline-none shadow-none`}
                        key={`pagination_${key}`}
                        onClick={() => {
                            setPage(slot)
                            setParams({
                                ...params,
                                page: slot,
                            } as ParamsPayload)
                        }}
                    >
                        {slot}
                    </span>
                ))}
                <button
                    className="p-2 rounded bg-primary-cyan disabled:bg-gray-200"
                    disabled={disables.next}
                    onClick={() => handleNext()}
                >
                    <ChevronRightIcon className="text-white w-5" />
                </button>

                <button
                    className="p-2 rounded bg-primary-cyan disabled:bg-gray-200"
                    disabled={disables.next}
                    onClick={() => handleEnd()}
                >
                    <ChevronDoubleRightIcon className="text-white w-5" />
                </button>
            </div>
        </div>
    )
}
