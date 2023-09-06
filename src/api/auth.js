import axios from 'axios'
const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/auth`,
    headers: {
        'Content-type': 'application/json'
    },
})

export async function register(body) {
    const response = await Axios.post('register', {
        ...body
    })
    return response
}
export async function login(body) {

    const response = await Axios.post('login', {
        ...body
    })
    return response

}
export async function forgetpassword(body) {
    const response = await Axios.post('forgetpassword', {
        ...body
    })
    return response
}
export async function verify(body) {

    const response = await Axios.post('verify', {
        ...body
    },{
        headers:{
            'session-token':sessionStorage.getItem("sessionToken")
        }
    })
    return response
}
export async function resend() {
    const response = await Axios.post('resend',{},{
        headers:{
            'session-token':sessionStorage.getItem("sessionToken")
        }
    })
    return response
}