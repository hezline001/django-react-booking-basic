import { NavLink, useNavigate } from "react-router-dom"

export default function ListSpaces({spaces}){
    
    return(
        <div className="mx-2 w-1/4 relative overflow-x-auto shadow-md sm:rounded-lg m-2">
                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Maximum slots
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available slots
                            </th>
                            <th scope="col" className="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {spaces.map(space=>{
                            return(
                                <tr key={space.id} className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-900">
                                        <NavLink
                                            to={`${space.id}`}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? " font-extrabold" : ""
                                            }
                                            >
                                            {space.name}
                                            </NavLink>
                                        
                                    </th>
                                    <td className="px-6 py-4">
                                        {space.max_slots}
                                    </td>
                                    <td className="px-6 py-4">
                                        {space.available_slots}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* delete form will be here */}
                                        
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
    )
}