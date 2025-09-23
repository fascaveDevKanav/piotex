import axios from "axios"
import { getAuthToken, removeAuthToken } from "../common/common";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});


//  sending the api and token in the header on every request 
api.interceptors.request.use((config) =>{
   const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
   if (ApiKey) {
       config.headers['apikey'] = ApiKey;
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
    removeAuthToken();
    
    if(typeof window !== 'undefined'){
        window.location.href = '/login';
    }
  
}

return Promise.reject(error);

   
})
export default api;


