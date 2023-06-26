import { Form } from "react-router-dom";
import SpaceCreationForm from "../forms/SpaceCreationFrom";
import { useEffect, useState } from "react";

export function CreateSpace({errors}){
    let [showModal,setShowModal] = useState(false)
    let [myerros,setMyerros] = useState(errors)
    console.log(errors)
    useEffect(()=>{if(errors='close'){setShowModal(false)};setMyerros(errors)},[errors])
    return(
        <>
            

            <button onClick={()=>{setShowModal(true)}} className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 mb-2" type="button">
            Create new space
            </button>

            {showModal && <div id="authentication-modal" tabIndex="-1" aria-modal="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
                <div className="relative w-full max-w-md max-h-full ">
                
                    <div className="relative bg-gray-200 rounded-lg shadow shadow-slate-400">
                        <button onClick={()=>{setShowModal(false);setMyerros(null)}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Create new space</h3>
                            <SpaceCreationForm errors={myerros} />
                        </div>
                    </div>
                </div>
            </div> }
            

        </>
    )
}