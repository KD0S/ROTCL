import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import { useEffect, useState } from "react"
import { config } from "../config"

const DuelRequestModal = ({ duelRequest, display, handleModal, duelAccept }) => {

    return (
        <div className={`fixed z-10 left-0 top-0 w-screen h-screen overflow-auto backdrop-blur-md ${display}`}>
            <div className=" flex justify-center flex-col bg-slate-800 mt-20 mx-auto p-2 w-1/3 rounded-md">
                <span className="hover:cursor-pointer" onClick={handleModal}><FontAwesomeIcon icon={faXmark} className="text-2xl text-white bg-red-600 p-1 rounded-md"></FontAwesomeIcon></span>
                <h1 className={`my-5 text-center text-3xl font-bold text-white`}>{duelRequest.player} wants to fight you!</h1>
                <div className="flex justify-center my-5">
                <button onClick={duelAccept} className="mx-5 rounded-lg bg-green-600 p-1 text-white font-bold">Accept</button>
                <button onClick={handleModal} className="mx-5 rounded-lg bg-red-600 p-1 text-white font-bold">Reject</button>
                </div>
            </div>
        </div>
    )
}

export default DuelRequestModal