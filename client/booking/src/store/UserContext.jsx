import { createContext, useState } from "react"

export function UserContextProvider({children,user}){
    //user comes the parent route. make sure that youre doing this in every route level. 
    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export let userContext = createContext(null)