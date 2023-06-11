import { atom,useAtom } from 'jotai'
import girl from "../assets/girl.png";
import boy from "../assets/boy.png";


const authorAtom = atom({
    name: "",
    username: "",
    email:"",
    bio:"",
    gender:"",
    profilePicture: false?boy:girl,
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