export interface PaginationProps {
    disables: {
        next: boolean
        prev: boolean
    }
    handleStart: () => void
    handleEnd: () => void
    handleNext: () => void
    handlePrev: () => void
    setPage: (s: number) => void
    slots: number[]
    total: number
    perPage: number
}
