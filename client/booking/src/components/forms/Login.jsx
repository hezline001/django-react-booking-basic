import { Form } from "react-router-dom";

export default function LoginForm({error}){
    return(
        <Form method = 'post' className="w">
            
            <div className="relative m-2">
                <input required={true} type="email" name="email" id="floating_email" className="   bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_email" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
            </div>


            <div className="relative m-2">
                <input required={true} type="password" name="password" id="floating_pass" className="  w-1/6 bg-white-200 appearance-none border-2 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 peer" placeholder=" " />
                <label htmlFor="floating_pass" className=" absolute text-sm text-purple-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
            </div>


            <button type="submit" className="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Submit
            </button>
            {typeof(error)=== 'string' && <span>{error}</span> }
        </Form>
    )
}