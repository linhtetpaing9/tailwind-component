import { LoadingIcon } from "../Icons"

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_120px)]">
            <LoadingIcon className="w-10 h-10" />
        </div>
    )
}

export const SkeletonLoading = () => {
    return (
        <div className="flex justify-center h-64">
            <LoadingIcon className="w-5" />
        </div>
    )
}

export default Loading
