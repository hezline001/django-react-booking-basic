import axios from "../../axios/axios"
import { NavLink, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/navbar/navbar"
import localforage from "localforage"
import { UserContextProvider } from "../../store/UserContext"
import { useState } from "react"

export async function adminRootLoader(){
    //check if user is present and have admin status via server.. redirect to admin login if not authorised, else do nothing
    console.log('inside admin loader')
    try {
        let response =await axios.get('/accounts/admin/checkuser/',{withCredentials:true})
    
        try{
            console.log('error')
            let user = await localforage.getItem('user')
            console.log(user)
            if(user===null){
                throw new Error('No user found')
            }
            return user
        }catch{
            return redirect('/logout') 
        }
    } catch (e) {
        if(e.response){
            return redirect('/admin/login')
        }else if(e.request){
            throw new Error('Server unavailable')
        }else{
            throw new Error('Something unexpected happened')
        }
    }
}

export function AdminRoot(){
    let data = useLoaderData()
    let [user,setUser] = useState(data)
    return(
        <div>
            <UserContextProvider user={user}>
            <Navbar title="Spacez Admin Panel"/>

            <NavLink
            to={`/admin/users`}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " font-extrabold" : ""
            }
            >
            users
            </NavLink> / 
            <NavLink
            to={`/admin/spaces`}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " font-extrabold" : ""
            }
            >
            spaces
            </NavLink>
            <Outlet/>
            </UserContextProvider>
        </div>
    )
}