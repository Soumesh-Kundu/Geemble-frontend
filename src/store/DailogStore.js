import { atom, useAtom } from 'jotai'
export const ACTIONS = {
    SET_DAILOG:'set_dailog',
    CLEAR:'clear'
}

const defaultValue={
    messege: "",
    isNotConfirmed: false,
    handleOnYes: () => { },
    handleOnNo: () => { }
}
const dailogAtom = atom(defaultValue)

const dailogManipulateAtom = atom(
    (get) => get(dailogAtom),
    (get, set, action) => {
        const dailog = get(dailogAtom)
        switch (action.type) {
            case ACTIONS.SET_DAILOG:
                set(dailogAtom,{...dailog,...action.payload})
                return
            case ACTIONS.CLEAR:
                set(dailogAtom,defaultValue)
                return 
            default:
                set(dailogAtom,dailog)
                return
        }
    }
)

export function useDailogAtom(){
    return useAtom(dailogManipulateAtom)
}