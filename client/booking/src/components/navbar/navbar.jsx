import { useContext } from "react"
import { userContext } from "../../store/UserContext"
import { useNavigate } from "react-router-dom"

export function Navbar({title=''}){
    let user = useContext(userContext)
    let navigate = useNavigate()
    
    return(
        <div className = "flex w-full border border-b-2 h-10 items-center justify-between px-3 mb-3">
            <div className=" font-sans font-bold ">{title}</div>
            <div>
                
                <span className=" font-sans font-medium mx-1">{user && user.username}</span> 
                <button className=" font-light text-xs hover:bg-gray-300 border-2 py-1 px-4 border-gray-900 rounded-md" onClick={()=>{ user ? navigate('/logout') : navigate('/login') }}>
                    {user ? 'Logout':'Login'}
                    </button>
            </div>
            
        </div>
    )
}