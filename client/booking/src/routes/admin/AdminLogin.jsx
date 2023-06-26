import axios from "../../axios/axios"
import localforage from "localforage"
import { Form,redirect, useActionData } from "react-router-dom"
import LoginForm from "../../components/forms/Login"

export async function adminLoginLoader({request}){
    try{
        let response = await axios.get('/accounts/admin/checkuser/',{
            withCredentials:true,
        })
        // return null
        return redirect('/admin')
    }catch(e){
        if(e.response){
            await localforage.removeItem('user')
            return null
        }
        if(e.request){
            throw new Error('Network down')
        }
    }
}

export async function adminLoginAction({request}){
    let formData = await request.formData()
    
    let error
    try{
        let response = await axios.post('/accounts/admin/login/',Object.fromEntries(formData),{withCredentials:true})
        let value = await localforage.setItem('user',response.data)
        return redirect('/admin')
    }catch(e){
        if(e.response){
            error = e.response.data
            return error
        }
        if(e.request){
            error = 'network down please try again later'
            return error
        }
    }
}

export function Login(){
    let error = useActionData()
    return(
        <LoginForm error={error}/>
    )
}
