import { redirect, useLoaderData } from "react-router-dom"
import axios from "axios"


export async function testloader(){
    try{
        let response = await axios.get("http://localhost:8000/accounts/users/54/",{
            withCredentials:true,
        })
        return response
    }catch(e){
        if (e.response){
            if(e.response.status === 403){
                
                return redirect('/admin/login')
            }else{
                return null
            }
        }else if(e.request){
            throw new Error('Server Unavailable')
        }
    }
}

export function Test(){
    let data = useLoaderData()
    console.log(document.cookie)
    console.log(data)
    return(
        <h2>protected path</h2>
    )
}