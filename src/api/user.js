import axios from 'axios'
const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/user`,
    headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
    },
})

export async function getDetails() {
    const response = await Axios.get('getDetails')
    return response
}
export async function updateUser(body) {
    const response = await Axios.patch('update', {
        ...body
    })
    return response
}

export async function verify(body) {
    console.log(localStorage.getItem('authToken'))
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verify`, {
        ...body
    },{
        headers: {
            'auth-token': localStorage.getItem('authToken'),
            'session-token':sessionStorage.getItem('sessionToken')
        }
    })
    return response
}

export async function resend() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/resend`,{
        headers: {
            'auth-token': localStorage.getItem('authToken'),
            'session-token':sessionStorage.getItem('sessionToken')
        }
    })
    return response
}
export async function searchUsers(query) {
    const response = await Axios.get(`searchUser?username=${query}`)
    return response
}

export async function getUser(params) {

    const response = await Axios.get(`getUser/${params}`)
    return response
}
export async function changeDP(body) {
    const response = await Axios.post('changeDP', body,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}
export async function newpassword(body) {
    const response = await Axios.post('newpassword', {
        ...body
    },{
        headers:{
            'auth-token':localStorage.getItem('authToken')
        }
    })
    return response
}
