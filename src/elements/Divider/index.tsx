import { classNames } from "$app/hooks/helpers/ui"

// fixme: dup codes
const Divider = ({
    className,
    type = "horizontal",
}: {
    className?: string
    type?: "horizontal" | "vertical"
}) => {
    if (type === "horizontal") {
        return (
            <div
                className={classNames(
                    className || "",
                    "m-0 p-0 border-t border-solid fs-[14px] leading-3 border-black opacity-5"
                )}
            />
        )
    }

    // practical useage only apply in timeline components
    if (type === "vertical") {
        return (
            <div
                className={classNames(
                    className || "",
                    "absolute bottom-0 left-[6%] translate-x-[6%] border-l-2 border-solid border-[#f0f0f0]"
                )}
                style={{
                    height: "calc(100% - 10px)",
                }}
            />
        )
    }

    return (
        <div
            className={classNames(
                className || "",
                "m-0 p-0 border-t border-solid fs-[14px] leading-3 border-black opacity-5"
            )}
        />
    )
}

export default Divider
