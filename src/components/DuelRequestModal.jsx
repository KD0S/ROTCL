import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react"

const DuelRequestModal = ({ duelRequest, display, handleModal, duelAccept }) => {
    const [width, setWidth] = useState(100);

    useEffect(()=>{

        const intervalID = setInterval(() => {
            setWidth(prev => prev - 1.5);
        }, 50)
    
        const timeout = setTimeout(() => {
            handleModal();
            clearInterval(intervalID);
        }, 5000)

        return () => clearTimeout(timeout);
    
    },[])

    return (
        <div className={`absolute z-3 bottom-10 right-10 ${display} rounded-md"`}>
            <div className=" flex justify-center flex-col bg-slate-800 mx-auto">
                <div style={{ width: `${width}%` }} className="bg-green-600 w-full h-3 transition-all"></div>
                <div className="p-2">
                    <span className="hover:cursor-pointer" onClick={handleModal}><FontAwesomeIcon icon={faXmark} className="text-white bg-red-600 p-1 rounded-md"></FontAwesomeIcon></span>
                    <h1 className={`my-5 text-center text-xl font-bold text-white`}>{duelRequest.player} wants to fight you!</h1>
                    <div className="flex justify-center my-2">
                        <button onClick={duelAccept} className="mx-5 rounded-lg bg-green-600 p-1 text-sm text-white font-bold">Accept</button>
                        <button onClick={handleModal} className="mx-5 rounded-lg bg-red-600 p-1 text-sm text-white font-bold">Reject</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DuelRequestModal