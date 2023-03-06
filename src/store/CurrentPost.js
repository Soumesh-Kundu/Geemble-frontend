import { atom, useAtom } from 'jotai'
export const ACTIONS = {
    SET_POST: 'set_post',
    CLEAR: 'clear'
}

const defaultState = {
    _id: "",
    username: "",
    time:"",
    caption: "",
    likes:[],
    comments:[],
    postedImage: false,
    activeFor:""
}
const currentPostAtom = atom(defaultState)

const postManipulateAtom = atom(
    (get) => get(currentPostAtom),
    (get, set, action) => {
        const currentPost = get(currentPostAtom)
        switch (action.type) {
            case ACTIONS.SET_POST:
                set(currentPostAtom, { ...currentPost, ...action.payload })
                return
            case ACTIONS.CLEAR:
                set(currentPostAtom, defaultState)
                return
            default:
                set(currentPostAtom,currentPost)
                return
        }
    }
)

export function usePostAtom() {
    return useAtom(postManipulateAtom)
}