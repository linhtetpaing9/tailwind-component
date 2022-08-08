export interface AnyObj {
    [key: string]: string
}
export interface GroupObj {
    [key: string]: {
        name: string
    }[]
}
export interface AnySelect extends AnyObj {}
export interface CountrySelect extends AnySelect {}
export interface AddressSelect extends AnySelect {}
export interface WorkShopSelect extends AnySelect {}
export interface StationSelect extends AnySelect {}
export interface ModelSelect extends AnySelect {}
export interface SubModelSelect extends AnySelect {}
export interface MakeSelect extends AnySelect {}
