import { atom, useAtom } from 'jotai'
export const ACTIONS = {
    SET_ALERT:'set_alert',
    CLEAR:'clear'
}

const defaultValue={
    messege: "",
    isActive:false,
    alertType:""
}
const alertAtom = atom(defaultValue)

const AlertManipulateAtom = atom(
    (get) => get(alertAtom),
    (get, set, action) => {
        const alert = get(alertAtom)
        switch (action.type) {
            case ACTIONS.SET_ALERT:
                set(alertAtom,{isActive:true,...action.payload})
                return
            case ACTIONS.CLEAR:
                set(alertAtom,defaultValue)
                return 
            default:
                set(alertAtom,alert)
                return
        }
    }
)

export function useAlertAtom(){
    return useAtom(AlertManipulateAtom)
}