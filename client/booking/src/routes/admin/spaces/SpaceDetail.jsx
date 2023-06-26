import { Form, redirect, useLoaderData } from 'react-router-dom'
import axios from '../../../axios/axios'
import ListSlots from '../../../components/spaces/ListSlots'

export async function spaceDetailLoader({params}){
    try{
        let response = await axios.get(`/spaces/${params.spaceId}/`,{withCredentials:true})
        return response.data
    }catch(e){
        throw new Error('Failed to retrive data')
    }
}

export async function spaceDetailAction({request}){
    let formdata = await request.formData()
    let data = Object.fromEntries(formdata)
    if(data.action === 'approve'){
        try{
            let response = await axios.patch('/spaces/action/',data,{withCredentials:true})
            return null
        }catch(e){
            if(e.response.status ===403){
                return redirect('/logout')
            }else{
                throw new Error('Server unavailable')
            }
        }
    }else if(data.action === 'reject' || data.action == 'clear'){
        try{
            let response = await axios.delete(`/spaces/slot/destroy/${data.id}`,{withCredentials:true})
            return null
        }catch(e){
            if(e.response.status ===403){
                return redirect('/logout')
            }else{
                throw new Error('Server unavailable')
            }
        }
    }
    return null
}

export function SpaceDetail(){
    let data = useLoaderData()
    let space = data.space
    let slots = data.slots
    let custom_slots =[]
    for(let i=1;i<=(space.max_slots);i++){
        let slot = slots.find(slot=>slot.slot_id==i)
        if(slot){
            custom_slots.push(slot)
        }else{
            custom_slots.push({'slot_id':i,'status':'empty'})
        }
    }
    return(
        <>  
            <div className='flex w-full justify-between px-10'>
            <div className=' mt-3 font-extrabold mx-2'> {space.name} </div> 
            <Form method='post' action={`/admin/spaces/destroy/${space.id}/`}>

            <button className=' text-xs font-light bg-red-300 rounded-md px-4 py-1' type='submit'>Delete Space</button>
            </Form>
            </div>
            <ListSlots slots={custom_slots}/>
        </>
    )
}
