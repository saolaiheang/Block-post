function Btn({name,onClick}){
    return(
        <>
        <div className=" w-full text-center mb-5">
        <button className="bg-blue-600 px-6 py-4 text-center text-white font-bold " onClick={onClick}>{name}</button>
        </div>

        </>
    )
}
export default Btn;