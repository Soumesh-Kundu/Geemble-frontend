import axios from 'axios'
const Axios=axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}/api/posts`,
    headers:{
        'Content-type':'application/json'
    }
})

export async function create(body) {
    try {
        const response = await Axios.post('create',{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('post uploaded')
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
export async function update(params,body) {
    try {
        const response = await Axios.patch(`update/${params}`,{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('post updated')
            return 
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function Delete(params,body) {
    try {
        const response = await Axios.delete(`update/${params}`)
        if(response.status===200 & response.data?.success){
            console.log('post deleted')
            return 
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function getPosts(page) {
    try {
        const response = await Axios.get(`getPosts?page=${page}&limit=5`)
        if(response.status===200 & response.data?.success){
            console.log('posts fetched')
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
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function getUsersPosts(param,page) {
    try {
        const response = await Axios.get(`getPost/${param}?page=${page}&limit=5`)
        if(response.status===200 & response.data?.success){
            console.log(`posts fetch for ${param}`)
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
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function liked(param,body) {
    try {
        const response = await Axios.post(`liked/${param}`,{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('post liked')
            return
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function createComment(param,body) {
    try {
        const response = await Axios.post(`comment/${param}`,{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('post commented')
            return
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}
export async function deleteComment(param,commentid,body) {
    try {
        const response = await Axios.delete(`comment/${param}?commentId=${commentid}`,{
            ...body
        })
        if(response.status===200 & response.data?.success){
            console.log('post delete commented')
            return
        }
    }
    catch ({response}) {
        if(response===undefined){
            console.log('Server is Down')
            return 
        }  
        if(response.status===401 && !response.data?.success){
            console.log('Not Allowed')
            return 
        }
        if(response.status===500){
            console.log('Server ERROR')
        }
    }
}