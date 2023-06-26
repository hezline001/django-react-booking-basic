import { createContext,useState,useReducer} from "react"

export let SelectedSlotsCxt = createContext(null)
export let DispatchContext = createContext(null)

export function SelectedContextProvider({children}){
    let [selectedSlots,dispatch] = useReducer(selectedSlotReducer,[])
    return(
        <SelectedSlotsCxt.Provider value={selectedSlots}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </SelectedSlotsCxt.Provider>
    )
}

function selectedSlotReducer(selectedSlots,action){
    switch (action.type) {
        case 'added':
            let nw = [...selectedSlots,action.id]
            nw.sort((a, b) => a - b)
            return nw
        case 'removed':
            let new_array = selectedSlots.filter(slot=>slot !== action.id)
            return new_array
        case 'removeall':
            return []
        default:
            break;
    }
}