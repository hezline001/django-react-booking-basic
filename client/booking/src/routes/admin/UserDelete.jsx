import axios from "../../axios/axios"
import { redirect } from "react-router-dom";

export async function userDeleteAction({params}){
    try{
        let response = await axios.delete(`accounts/users/${params.userId}/delete/`,{withCredentials:true})
        return redirect('/admin/users')
    }catch(e){
        if(e.response){
            if(e.response.status === 403){
                return null
                // return redirect('/admin/login')
            }else{
                throw new Error('Unable to process request right now')
            }
        }else if(e.request){
            throw new Error('Server unavailable')
        }else{
            throw new Error('idk wth happened')
        }
    }
}