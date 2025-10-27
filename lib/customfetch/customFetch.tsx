import api from "../api/api"
import { reduxSliceData } from "@/redux/features/reduxData";
import { errorResponse } from "../common/common";
import { AppDispatch } from "@/redux/store/store";
export const getListData = async (
    dispatch:AppDispatch,
    reduxname:string, url:string, body?:any, flag?:boolean)=>{
    try {
        const response = await api.get(url, body);
        if(response.status === 200){
          
            dispatch(reduxSliceData({ key: reduxname, data: response?.data }));
            return {success:true, data:response?.data}
        }else{
             const message = errorResponse(response);
             console.log(message)
             return {success:false, message}
        }



    } catch (err) {
            const message = errorResponse(err);
            console.error(" error:", message);
            return { success: false, message };
        
    }
    


}

export const getProductById = async (
    dispatch:AppDispatch,
    reduxname:string, url:string, body?:any, flag?:boolean)=>{
    try {
        const response = await api.post(url, body);
        if(response.status === 200){
          
            dispatch(reduxSliceData({ key: reduxname, data: response?.data }));
            return {success:true, data:response?.data}
        }else{
             const message = errorResponse(response);
             console.log(message)
             return {success:false, message}
        }



    } catch (err) {
            const message = errorResponse(err);
            console.error(" error:", message);
            return { success: false, message };
        
    }
    


}

export const addData = async (
 url:string, body?:any, flag?:boolean)=>{
    try {
        const response =flag ? await api.post(url, body, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }) : await api.post(url, body);
         console.log("response", response)
        if(response.status === 200 || response.status === 201){
            return {success:true, data:response?.data}
        }else{
             const message = errorResponse(response);
             console.log(message)
             return {success:false, message}
        }

    } catch (err) {
            const message = errorResponse(err);
            console.error(" error:", message);
            return { success: false, message };
        
    }
    
}