import { ReactNode, useEffect } from "react"
import { DrawerProps } from "./type"
import { CrossIcon } from "../Icons"
import { classNames } from "$app/hooks/helpers/ui"

export default function Drawer({
    children,
    isOpen,
    setIsOpen,
    escToClose = true,
}: DrawerProps & { children: ReactNode }) {
    // lock scroll for drawer
    useEffect(() => {
        const html = document.getElementsByTagName("body")[0]

        if (isOpen) {
            html.classList.add("lock-scroll")
        } else {
            html.classList.remove("lock-scroll")
        }
        return (): void => {
            html.classList.remove("lock-scroll")
        }
    }, [isOpen])

    // implement escape keydown
    useEffect(() => {
        if (isOpen && escToClose) {
            const close = (e: KeyboardEvent) => {
                if (e?.key === "Escape") {
                    setIsOpen(false)
                }
            }
            window.addEventListener("keydown", close)
        }
        return () => window.removeEventListener("keydown", close)
    }, [isOpen])

    return (
        <main
            className={classNames(
                isOpen
                    ? "transition-opacity opacity-100 duration-500 translate-y-0"
                    : "delay-500 opacity-0 translate-y-full",
                "fixed overflow-hidden z-[1000] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out "
            )}
        >
            <section
                className={classNames(
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "rounded-t-xl w-screen bottom-0 absolute bg-white h-[calc(100%_-_64px)] shadow-xl delay-400 duration-500 ease-in-out transform  "
                )}
            >
                {isOpen && (
                    <CrossIcon
                        className="absolute right-5 -top-10 z-[150] text-white cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                )}
                <article className="relative w-screen flex flex-col space-y-6 overflow-y-scroll h-full">
                    {children}
                </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer "
                onClick={() => setIsOpen(false)}
            ></section>
        </main>
    )
}
