import localforage from "localforage"
import { Form,redirect, useActionData } from "react-router-dom"
import axios from "../axios/axios"
import LoginForm from "../components/forms/Login"
export async function loginLoader(){
    try{
        let connect = await axios.get('/accounts/checkuser/',{
            withCredentials:true,
        })
        // return null
        return redirect('/')
    }catch(e){
        if(e.response){
            await localforage.removeItem('user')
            return null
        }
        if(e.request){
            return null
        }
    }
}

export async function loginAction({request}){
    let formData = await request.formData()
    let error
    try{
        let response = await axios.post('/accounts/login/',Object.fromEntries(formData),{withCredentials:true,})
        let value = await localforage.setItem('user',response.data)
        return redirect('/')
    }catch(e){
        if(e.response){
            console.log(e);
            error = e.response.data
            return error
        }
        if(e.request){
            console.log('hello')
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
