import { PaginationProps } from "$app/elements/CustomPagination/type"
import { ParamsPayload } from "$app/types/models/params"
import { Meta } from "$app/types/response"
import { useEffect, useState } from "react"
import { range } from "../helpers/numbers"

export const usePaginations = (
    meta: Meta,
    params: ParamsPayload,
    setParams: (p: ParamsPayload) => void
) => {
    const [page, setPage] = useState(1)
    const total = meta?.total
    const perPage = params?.per_page ?? 1

    const pageSizes = Math.ceil(total / perPage)

    const pageSlots = 5
    const steps =
        pageSizes < pageSlots
            ? Math.floor(pageSizes / 2)
            : Math.floor(pageSlots / 2)

    const rangeSlots = range(1, pageSizes)
    const initialSlots = rangeSlots.slice(page - 1, pageSlots)
    const finalSlots = rangeSlots.slice(pageSizes - pageSlots, pageSizes)

    const [slots, setSlots] = useState(initialSlots)
    const [disables, setDisables] = useState({
        next: false,
        prev: true,
    })

    const handleStart = () => {
        setPage(1)

        if (steps > 2) {
            setSlots(initialSlots)
        } else {
            setSlots(range(1, pageSizes))
        }
    }

    const handleEnd = () => {
        setPage(pageSizes)
        if (steps > 2) {
            setSlots(finalSlots)
        } else {
            setSlots(range(1, pageSizes))
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage((p: number) => p - 1)
        }
    }

    const handleNext = () => {
        if (page < pageSizes) {
            setPage((p: number) => p + 1)
        }
    }

    useEffect(() => {
        setSlots(initialSlots)
        handleStart()
        if (page >= pageSizes) {
            setParams({ ...params, page: 1 })
        }
    }, [pageSizes])

    useEffect(() => {
        setParams({ ...params, page })
    }, [page])

    useEffect(() => {
        const generateSlots = (nextSteps: number, backSteps: number) => {
            const nextArray = range(1, nextSteps)
            const backArray = range(1, backSteps).map((st) => st * -1)
            return [...backArray, 0, ...nextArray].sort((a, b) => a - b)
        }

        if (pageSizes > pageSlots) {
            if (page - steps >= 1 && page + steps <= pageSizes) {
                setSlots(generateSlots(steps, steps).map((p) => p + page))
            }

            if (page === 2) {
                setSlots(
                    generateSlots(steps + 1, steps - 1).map((p) => p + page)
                )
            }
            if (pageSizes - 1 === page) {
                setSlots(
                    generateSlots(steps - 1, steps + 1).map((p) => p + page)
                )
            }

            if (page === 1) {
                setSlots(initialSlots)
            }
            if (page === pageSizes) {
                setSlots(finalSlots)
            }
        }
    }, [page, pageSizes])

    useEffect(() => {
        if (page > 1 || page < pageSizes) {
            setDisables({ prev: false, next: false })
        }
        if (page === 1) {
            setDisables({ prev: true, next: false })
        }
        if (page === pageSizes) {
            setDisables({ prev: false, next: true })
            if (pageSizes === 1) {
                setDisables({ prev: true, next: true })
            }
        }
    }, [page, pageSizes])

    const paginationProps: PaginationProps = {
        setPage,
        perPage,
        disables,
        handleStart,
        handleEnd,
        handleNext,
        handlePrev,
        slots,
        total,
    }

    return { ...paginationProps }
}
