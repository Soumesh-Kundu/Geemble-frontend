import axios from 'axios'
const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/posts`,
    headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('authToken')
    },
})

export async function create({ body }) {
    const response = await Axios.post('create', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': localStorage.getItem('authToken')
        }
    })
    return response
}
export async function update({ params, body }) {
    const response = await Axios.patch(`update/${params}`, body,{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return response
}
export async function Delete(params) {

    const response = await Axios.delete(`delete/${params}`,{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return response
}
export async function getPosts(page) {
    const res = await Axios.get(`getPosts?page=${page}&limit=5`,{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return {
        nextPage: res.data.nextPage,
        previousPage: res.data.previousPage,
        posts: res.data.posts,
        totalsPosts: res.data.totalsPosts
    }
}
export async function getUsersPosts(param, page) {
    const response = await Axios.get(`getPosts/${param}?page=${page}&limit=5`,{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return response.data
}
export async function liked(param, body) {
    const response = await Axios.post(`liked/${param}`, body,{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return response
}
export async function createComment(param, body) {
    const response = await Axios.post(`comment/${param}`, {
        ...body
    },{
        headers: {
            'auth-token': localStorage.getItem('authToken')
        },
    })
    return response
}
export async function deleteComment(param, commentid, user) {
    const  body={usersname:user}
    console.log(body)
    const response = await Axios.delete(`comment/${param}?commentId=${commentid}`, body, {
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
        }
    })
    return response
}