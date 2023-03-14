import axios from 'axios'
const Axios=axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}/api/user`,
    headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('authToken')
    }
})

export async function getDetails(){
    try {
        const response=await Axios.get('getDetails')
        if(response.status===200 && response.data.success){
            return response.data.result
        }
    } catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401){
            console.log("resticted access")
        }
        if(response.status===500){
            console.log('Server ERROR')
            return 
        }
    }
}
export async function updateUser(body){
    try {
        const response=await Axios.patch('update',{
            ...body
        })
        if(response.status===200 && response.data.success){
            return response.data.result
        }
    } 
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401){
            console.log("resticted access")
        }
        if(response.status===400 && !response.data.success){
            console.log("resticted access")
        }
        if(response.status===500){
            console.log('Server ERROR')
            return 
        }
    }
}

export async function verify(body){
    try {
        const response=await Axios.post('verify',{
            ...body
        })
        if(response.status===200 && response.data.success){
            return response.data.result
        }
    } catch ({response}) {
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
export async function searchUsers(query) {
    try {
        const response = await Axios.get(`searchUser?username=${query}`)
        if(response.status===200 & response.data?.success){
            console.log('here your users')
            return {
                ...response.data
            }
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

export async function getUser(params){
    try {
        const response = await Axios.get(`getUser/${params}`)
        if(response.status===200 & response.data?.success){
            console.log('here your users')
            return response.data.user
        }
    }catch ({response}) {
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
export async function changeDP(body){
    try {
        const response = await Axios.post('changeDP',{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('dpChanged')
            return 
        }
    }catch ({response}) {
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
export async function newpassword(body){
    try {
        const response = await Axios.post('newpassword',{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('password changed')
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
