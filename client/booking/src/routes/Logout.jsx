import axios from "../axios/axios"
import localforage from "localforage";
import { redirect } from "react-router-dom";

export async function logoutLoader({request}){
    const url = new URL(request.url);
    let query = url.searchParams.get("ref");
    if(!query){
        query = ''
    }
    try{
        let response = axios.get('accounts/logout/',{withCredentials:true})
        if(query==='admin'){
            return redirect('/admin/login')
        }else{
            return redirect('/login')
        }
    }catch(e){
        if(e.response){
            await localforage.removeItem('user')
            return redirect('/login')
        }else if(e.request){
            throw new Error('Unable to connect server')
        }
    }
}