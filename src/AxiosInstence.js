import axios from "axios"

const userToken = localStorage.getItem('loginUser')
// const adminToken = localStorage.getItem()

const axiosInstance = axios.create({
    baseURL:'http://localhost:8080/api',
    withCredentials:true
})

export default axiosInstance