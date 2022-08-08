export interface SelectProps extends DefaultSelectProps {
    value?: Option
    onChange?: (value: Option) => void
    onSelect?: (value: Option) => void
}

export interface MultiSelectProps extends DefaultSelectProps {
    value?: Option[]
    onChange?: (value: Option[]) => void
    onSelect?: (value: Option) => void
}

export interface DefaultSelectProps {
    className?: string
    options?: Option[]

    multiple?: boolean
    isLoading?: boolean
    disabled?: boolean
}

export type Option = {
    key: number | string
    value: string
}
