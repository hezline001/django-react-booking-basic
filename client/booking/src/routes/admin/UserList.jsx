import axios from "../../axios/axios"
import { Form, Link, redirect, useLoaderData,useLocation, useNavigate } from "react-router-dom"
import  Pagination  from "@mui/material/Pagination"
import { PaginationItem } from "@mui/material"

export async function userListLoader({request}){
    console.log('inside admin user list loader')
    let url = new URL(request.url)
    let query = url.searchParams.get('page')
    let res = ''
    if(query !== null){
        res = `?page=${query}`
    }
    try {
        let response = await axios.get(`/accounts/users/${res}`,{withCredentials:true})
        let data = response.data
        return data
    } catch (e) {
        if(e.response){
            if(e.response.status === 403){
                return redirect('/admin/login?ref=users')
            }else{
                throw new Error('Unable to process request right now')
            }
        }else if(e.request){
            throw new Error('Server unavailable')
        }else{
            throw new Error('idk wth happened')
        }
    }
}


export function UserList(){
    let navigate = useNavigate()
    let data = useLoaderData()
    let location = useLocation()
    let page = 1

    if(location.search){
        page = parseInt(location.search.split('=')[1])

    }
    let users = data.results
    let page_nums = data.num_pages
    return(
        <>
            <Pagination 
            count={page_nums} 
            page={page}
            renderItem={(item) => (
            <PaginationItem
                component={Link}
                to={`?page=${item.page}`}
                {...item}
            />
            )}
            siblingCount={0} 
            boundaryCount={2} />
       

            <div className="mx-2 w-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Staff
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>{
                            return(
                                <tr key={user.id} className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-900">
                                        {user.email}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_staff ? 'true': 'false'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {!user.is_staff && <DeleteUserForm user = {user}/> }
                                        
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>

        
    )
}


function DeleteUserForm({user}){
    return(
        <Form method="post" action={`${user.id}/delete`} 
                                            onSubmit={(event) => {
                                                if (
                                                  !window.confirm(
                                                    "Please confirm you want to delete this record."
                                                  )
                                                ) {
                                                  event.preventDefault();
                                                }
                                              }}
                                        >
                                        <button type="submit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                        </Form>
    )
}