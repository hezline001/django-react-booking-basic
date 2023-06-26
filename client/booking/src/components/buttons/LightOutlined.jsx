export default function LightOutlined({text,onClick=()=>{}}){
    return(
        <button onClick={onClick}
            type="button" 
            className="text-gray-900 bg-white border border-gray-600 hover:bg-gray-100 font-medium rounded-md text-xs px-4 py-1 mx-1"
        >
            {text}
        </button>
    )
}