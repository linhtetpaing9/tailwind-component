import { Fragment, useState, useTransition } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, RefreshIcon, SelectorIcon } from "@heroicons/react/solid"
import { AutoCompleteProps } from "../AutoComplete/type"
import React from "react"
import { Options } from "$app/placeholders/options"
import { classNames } from "$app/hooks/helpers/ui"
import { LoadingIcon } from "$app/elements/Icons"

const AutoComplete = React.forwardRef<HTMLSelectElement, AutoCompleteProps>(
    (props, ref) => {
        const [isPending, startTransition] = useTransition()
        const {
            isLoading,
            className,
            onChange,
            onSelect,
            disabled,
            options = Options,
            value = { key: 1, value: "" },
        } = props

        const [query, setQuery] = useState("")

        const updateFilterHanlder = (event: {
            target: { value: React.SetStateAction<string> }
        }) => {
            startTransition(() => {
                setQuery(event.target.value)
            })
        }

        const filteredList =
            query === ""
                ? options
                : options.filter((item) =>
                      item.value
                          .toLowerCase()
                          .replace(/\s+/g, "")
                          .includes(query.toLowerCase().replace(/\s+/g, ""))
                  )
        return (
            <div>
                <Combobox
                    value={value}
                    onChange={(v) => onChange?.(v)}
                    disabled={disabled}
                >
                    <div className="relative">
                        <div
                            className={classNames(
                                className || "",
                                `${
                                    disabled ? "bg-gray-300" : ""
                                } flex items-center gap-2 min-h-[56px] border-2 border-[#D1D5DB]  relative w-full overflow-hidden rounded-md py-2 px-3 text-sm leading-5 text-gray-900`
                            )}
                        >
                            <Combobox.Button className="ease-in flex items-center pr-2">
                                <Combobox.Input
                                    className={classNames(
                                        disabled ? "bg-gray-300" : "",
                                        "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-input-color text-black focus:ring-0"
                                    )}
                                    disabled={disabled}
                                    displayValue={(person: { value: string }) =>
                                        person?.value
                                    }
                                    onChange={updateFilterHanlder}
                                />
                            </Combobox.Button>
                            {isPending && isLoading ? (
                                <LoadingIcon className="w-5" />
                            ) : (
                                <Combobox.Button>
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            )}
                        </div>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredList.length === 0 && query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredList.map((item) => {
                                        const isSelected =
                                            item.key === value?.key
                                        return (
                                            <Combobox.Option
                                                key={item.key}
                                                className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    isSelected
                                                        ? "bg-primary-cyan text-white"
                                                        : "text-gray-900"
                                                }`}
                                                value={item}
                                                onClick={() => onSelect?.(item)}
                                            >
                                                <span
                                                    className={`block truncate ${
                                                        isSelected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {item.value}
                                                </span>
                                                {isSelected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            isSelected
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </Combobox.Option>
                                        )
                                    })
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        )
    }
)

export default AutoComplete
