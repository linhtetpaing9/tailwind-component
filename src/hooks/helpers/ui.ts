export function numeric(n: number | string, thousandsSeparatorSymbol = ",") {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)
}
export function removeComma(n: number | string) {
    return String(n).replace(/\$\s?|(,*)/g, "")
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}
