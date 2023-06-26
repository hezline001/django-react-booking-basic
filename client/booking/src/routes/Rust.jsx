import axios from "axios"

export async function rustloader(){
    try{

        let res = await axios.get("http://localhost:3000/")
        console.log("helo from rust")
        return null
    }catch{
        console.log("no helo")
        return null
    }
}

export function Rust(){
    return (<>hello from rust</>)
}