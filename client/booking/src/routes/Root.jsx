import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar/navbar";
import { redirect, useLoaderData, useRouteError } from "react-router-dom";
import localforage from "localforage";
import axios from "../axios/axios"
import { UserContextProvider } from "../store/UserContext";
import LightOutlined from "../components/buttons/LightOutlined";
import { ListSpaceUser } from "../components/spaces/ListSpaceUser";

export async function rootloader(){
    console.log('inside root loader')
    try{
        let response = await axios.get('/spaces/list/',{
            withCredentials:true,
        })
        let spaces = response.data
        try{
            let user = await localforage.getItem('user')
            if(user===null){
                throw new Error('No user found')
            }
            return {user,spaces}
        }catch{
            return redirect('/logout') 
        }
        
    }catch(e){
        //add conditions for response,request
        return redirect('/login')
    }
}

export function Root(){
    let {user} = useLoaderData()
    let {spaces} = useLoaderData()

    useEffect(()=>{
        console.log('mounted root')
        return()=>{console.log('unmounted root')}
    },[])
    return(
        <UserContextProvider user={user}>
        <div>
            <Navbar title="Spacez"/>
            <section>
                <ListSpaceUser spaces={spaces}/>
            </section>

        </div>
        </UserContextProvider>

    )
}


export function MainError(){
    let error = useRouteError()
    return(
        <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
    )
}