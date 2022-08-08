import { ReactNode } from "react"
import Badge from "../Badge"
import { SkeletonLoading } from "../Loading"
import { CardProps } from "./type"

const Card = ({
    title,
    children,
    loading,
}: CardProps & { children: ReactNode }) => {
    return (
        <div className="bg-white">
            {title}
            {loading ? <SkeletonLoading /> : children}
        </div>
    )
}

export default Card
