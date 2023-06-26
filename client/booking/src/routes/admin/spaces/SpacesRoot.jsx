// will be listing spaces, option to create space and also for deleting(from list)
import axios from '../../../axios/axios'
import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import ListSpaces from "../../../components/spaces/ListSpaces";
import { CreateSpace } from '../../../components/spaces/CreateSpace';

export async function spaceRootLoader(){
    try{
        let response = await axios.get('/spaces/list/',{withCredentials:true})
        console.log(response.data)
        return response.data
    }catch(e){
        if(e.response){
            console.log(e.response.data)
            return null
        }else if(e.request){
            throw new Error('Server unavailable')
        }
    }
}

export async function spaceRootAction({request}){
    let formData = await request.formData()
    try{
        let response =await axios.post('/spaces/create/',Object.fromEntries(formData),{withCredentials:true})
        return 'close'
    }catch(e){
        if(e.response){
            console.log(e.response.data)
            return e.response.data
        }else if (e.request){
            throw new Error('Server unavailable')
        }
    }
}

export function SpacesRoot(){
    let data = useLoaderData()
    let errors = useActionData()
    return(
        <>
            <CreateSpace errors={errors}/>
            <ListSpaces spaces={data}/>
            <Outlet/>
        </>
    )
}