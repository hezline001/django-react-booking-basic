import { useLoaderData, redirect, useSubmit, useActionData } from "react-router-dom"
import ListSlotsUser from "../../components/spaces/ListSlotsUser"
import axios from "../../axios/axios"
import localforage from "localforage"
import { UserContextProvider } from "../../store/UserContext"
import { Navbar } from "../../components/navbar/navbar"
import { useState,useContext, Fragment, useEffect } from "react"
import { DispatchContext, SelectedContextProvider,SelectedSlotsCxt } from "../../store/SelectedContext"
import { SlotBookingForm } from "../../components/forms/SlotBookingForm"

export async function SpaceDetailUserLoader({params}){
    console.log('inside space detail loader. user section')
    try{
        let response = await axios.get(`/spaces/${params.spaceId}/`,{withCredentials:true})
        let spaceSlots = response.data
        try{
            let user = await localforage.getItem('user')
            if(user===null){
                throw new Error('No user found')
            }
            return {user,spaceSlots}
        }catch{
            return redirect('/logout') 
        }
    }catch(e){
        if(e.response){
            if(e.response.status === 403){
                return redirect('/login')
            }
        }
        throw new Error('Failed to retrive data')
    }
}

export async function SpaceDetailUserAction({request,params}){
    let formdata = await request.formData()
    formdata.append('space_id',params.spaceId)
    try{
        let response =await axios.post('/spaces/bookslot/',Object.fromEntries(formdata),{withCredentials:true})
        console.log(response)
        return 'close'
    }catch(e){
        if(e.response){
            console.log(e.response)
        }else if(e.request){
            console.log(e.request)
        }
        return null
    }
    return null
}

export function SpaceDetailUser({space,custom_slots,user,errors}){
    let submit = useSubmit()
    let selectedSlots = useContext(SelectedSlotsCxt)
    let dispatch = useContext(DispatchContext)
    function handleSubmit(e){
        let formData = new FormData(e.target)
        formData.append('slots',selectedSlots)
        submit(formData,{method:'POST'})
        dispatch({type:'removeall'})
    }
    let [myerrors,setMyerrors] = useState(errors)
    useEffect(()=>{if(errors==='close'){setShowModal(false)};setMyerrors(errors)},[errors])
    let [showModal,setShowModal] = useState(false)

    let btn = <button onClick={()=>setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-3">
                Book now
                </button>
    let disbtn = <button disabled={true} className=" disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-3">
    Book now
    </button>
    return(
        <UserContextProvider user={user}>
            
            <Navbar title="Spacez"/>
            <h2 className="text-2xl font-bold capitalize mb-2 ms-2">{space.name}</h2>
            <div className="mb-2 ms-2">

            {space.available_slots} slots remaining...
            </div>
            <div className=" text-center font-bold"> Selected slots - {selectedSlots.map(slot=><Fragment key={slot}>{slot}, </Fragment>)}</div>
            <div className=" flex items-center justify-center">
                {selectedSlots.length > 0 ? btn : disbtn }
                
            </div>
            {showModal && <div id="authentication-modal" tabIndex="-1" aria-modal="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
                <div className="relative w-full max-w-md max-h-full ">
                
                    <div className="relative bg-gray-200 rounded-lg shadow shadow-slate-400">
                        <button onClick={()=>{setShowModal(false);setMyerrors(null)}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Book Slots</h3>

                            <SlotBookingForm errors={myerrors} handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div> }
                <ListSlotsUser slots={custom_slots}/>
        </UserContextProvider>
    )
}

export function WrappedSpaceDetailUser(){
    let {spaceSlots} = useLoaderData()
    let {user} = useLoaderData()
    let space = spaceSlots.space
    let slots = spaceSlots.slots
    
    let errors = useActionData()
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
        <SelectedContextProvider>
            <SpaceDetailUser space={space} custom_slots={custom_slots} user={user} errors={errors}/>
        </SelectedContextProvider>
    )
}