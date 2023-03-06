import { atom,useAtom } from 'jotai'


const authorAtom = atom({
    name: "Soumesh Kundu",
    username: "Soumenchandra",
    profilePicture: ""
})

const authorAtomManpulate=atom(
    (get)=>get(authorAtom),
    (get,set,data )=>{
        set(authorAtom,data)
    }   
)

export function useAuthorAtom(){
    return useAtom(authorAtomManpulate)
}