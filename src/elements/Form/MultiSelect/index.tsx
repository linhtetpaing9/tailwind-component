import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import React from "react"
import { classNames } from "$app/hooks/helpers/ui"
import { LoadingIcon } from "$app/elements/Icons"
import { MultiSelectProps } from "../Select/type"

const MultiSelect = React.forwardRef<HTMLSelectElement, MultiSelectProps>(
    (props, ref) => {
        const { isLoading, className, onChange, onSelect, options, value } =
            props

        return (
            <div>
                <Listbox
                    value={value}
                    onChange={(v) => onChange?.(v || [])}
                    multiple
                >
                    <div className="relative">
                        <Listbox.Button
                            className={classNames(
                                className || "",
                                "flex items-center gap-2 min-h-[56px] border-[#D1D5DB]  relative w-full overflow-hidden rounded-md py-2 px-3 text-sm leading-5 text-gray-900"
                            )}
                        >
                            <span className="block truncate capitalize">
                                {value?.map((item) => item?.value).join(", ")}
                            </span>
                            {isLoading ? (
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <LoadingIcon className="w-5" />
                                </span>
                            ) : (
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            )}
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm leading-5 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {options?.map((option, indx) => {
                                    const isSelected = value?.some(
                                        (v) => v.key === option.key
                                    )
                                    return (
                                        <Listbox.Option
                                            key={indx}
                                            className={`relative cursor-pointer select-none py-2 pl-10 pr-4 capitalize`}
                                            value={option}
                                            onClick={() => onSelect?.(option)}
                                        >
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        isSelected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {option.value}
                                                </span>
                                                {isSelected ? (
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                                                        <CheckIcon
                                                            fill="#00B4D8"
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        </Listbox.Option>
                                    )
                                })}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        )
    }
)
export default MultiSelect
