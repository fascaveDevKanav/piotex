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

api.interceptors.response.use((response)=> response,
(error)=>{
   if(error.response?.status === 401){
    localStorage.clear();
    
    if(typeof window !== 'undefined'){
        window.location.href = '/login';
    }
  
}

return Promise.reject(error);

   
})
export default api;


