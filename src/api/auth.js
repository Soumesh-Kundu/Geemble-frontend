import axios from 'axios'
const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/auth`,
    headers: {
        'Content-type': 'application/json'
    }
})

export async function register(body) {
    try {
        const response = await Axios.post('register', {
            ...body
        })
        if(response.status===201 & response.data?.success){
            console.log('registered')
            return response.data
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===400 && !response.data?.sucess){
            if(response.data?.email){
                console.log('email exists')
                return 
            }
            if(response.data?.username){
                console.log('username taken')
                return 
            }
        }
        if(response.status===500){
            console.log('Server ERROR')
            return 
        }
    }
}
export async function login(body) {
    try {
        const response = await Axios.post('login', {
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log(response.data.authToken)
            return response.data
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }   
        if(response.status===401 && !response.data?.sucess){
            console.log('unauthorized')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function forgetpassword(body) {
    try {
        const response = await Axios.post('forgetpassword', {
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('OTP Sended')
            return 
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('unauthorized account')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function verify(body) {
    try {
        const response = await Axios.post('verify', {
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('verified')
            return response.data
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('unauthorized access')
            return 
        }
        if(response.status===408 && !response.data?.success){
            console.log('OTP Expired')
            return 
        }
        if(response.status===400 && !response.data?.success){
            console.log('OTP is invalid')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function resend() {
    try {
        const response = await Axios.post('resend')
        if(response.status===200 & response.data?.success){
            console.log('OTP resended')
            return 
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('unauthorized account')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}