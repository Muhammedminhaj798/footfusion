import axios from "axios"

const userToken = localStorage.getItem('loginUser')
// const adminToken = localStorage.getItem()

const axiosInstance = axios.create({
    baseURL:'http://localhost:8080/api',
    withCredentials:true
})

export default axiosInstance
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true,
// });

// // Interceptor to automatically attach token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const userData = JSON.parse(localStorage.getItem('loginUser'));

//     if (userData && userData.token) {
//       config.headers.Authorization = `Bearer ${userData.token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
