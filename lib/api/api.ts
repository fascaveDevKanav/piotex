import axios from "axios"
import { getAuthToken, removeAuthToken } from "../common/common";
import { removeUser } from "../auth";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});


//  sending the api and token in the header on every request 
api.interceptors.request.use((config) =>{
   const apikey = process.env.NEXT_PUBLIC_API_KEY;
   if (apikey) {
       config.headers['apikey'] = apikey;
   }

   const token = getAuthToken();
   if(token){
         config.headers['Authorization'] = `Bearer ${token}`; 
   }
   return config;
},
   (error)=>{
   return Promise.reject(error);
}
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Clear auth only in browser
      if (typeof window !== "undefined") {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default api;


