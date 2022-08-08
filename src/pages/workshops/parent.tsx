import { ParentContext } from "$app/contexts/ParentContext"
import MultiColumnsLayout from "$components/Layouts/MultiColumnsLayout"
import { useMemo, useReducer } from "react"
import WorkShopList from "./list"

function reducer(
    state: { delete: boolean; edit: boolean },
    action: { type: string }
) {
    switch (action.type) {
        case "edit":
            return { edit: true, delete: state.delete }
        case "delete":
            return {
                delete: true,
                edit: state.edit,
            }
        case "cancelEdit":
            return { edit: false, delete: state.delete }
        case "cancelDelete":
            return { delete: false, edit: state.edit }
        default:
            throw new Error()
    }
}

const WorkShopsParent = () => {
    const initialState = { edit: false, delete: false }

    const [state, dispatch] = useReducer(reducer, initialState)
    const parentContextProviderValue = useMemo(
        () => ({ state, dispatch }),
        [state, dispatch]
    )
    return (
        <ParentContext.Provider value={parentContextProviderValue}>
            <MultiColumnsLayout>
                <WorkShopList />
            </MultiColumnsLayout>
        </ParentContext.Provider>
    )
}

export default WorkShopsParent
