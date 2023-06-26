import { Form, useActionData,redirect } from "react-router-dom";
import axios from "axios";
import localforage from "localforage";

export async function signupLoader(){
    try{
        let connect = await axios.get('http://localhost:8000/accounts/checkuser/',{
            withCredentials:true,
        })
        return redirect('/')
    }catch(e){
        if(e.response){
            await localforage.removeItem('user')
            return null
        }
        if(e.request){
            throw new Error('Network down')
        }
    }
}

export async function signupAction({request}){
    console.log('insidee signup action')
    const formData = await request.formData()
    let errors = {}
    try{
        let response = await axios.post('http://localhost:8000/accounts/signup/',
        Object.fromEntries(formData),
        {
            withCredentials:true,
        },
        // {
        //     email:formData.get('email'),
        //     username:formData.get('username'),
        //     password:formData.get('password'),
        //     password2:formData.get('password2'),}
            )
            let value = await localforage.setItem('user',response.data)
            return null
    }catch(e){
        console.log(e.response.data)
        errors = e.response.data
        return errors
    }

}

export function Signup(){
    let errors = useActionData()
    return(
        <Form method = 'post' className=" w">
            
            <div className="relative m-2">
                <input required={true} type="text" name="email" id="floating_email" className="   bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_email" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                {errors?.email && <span>{errors.email}</span>}
            </div>

            <div className="relative m-2">
                <input required={true} type="text" name="username" id="floating_username" className="  w-1/6 bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_username" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
                {errors?.username && <span>{errors.username}</span>}
            </div>

            <div className="relative m-2">
                <input required={true} type="password" name="password" id="floating_pass" className="  w-1/6 bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_pass" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                {errors?.password && <span>{errors.password}</span>}
            </div>

            <div className="relative m-2">
                <input required={true} type="password" name="password2" id="floating_cpass" className="  w-1/6 bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_cpass" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm password</label>
                {errors?.password2 && <span>{errors.password2}</span>}
            </div>

            <button type="submit" className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Submit
            </button>

        </Form>
    )
}