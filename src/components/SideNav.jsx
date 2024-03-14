import React from 'react'
import { DuelBtn } from './DuelBtn'

export const SideNav = (props) => {
    return (
        <nav className='fixed h-full w-40 bg-slate-800 right-0 rounded-md m-3 p-3'>
            <h1 className='text-center font-bold text-yellow-600 text-2xl'>Duel!</h1>
            <div className='flex flex-col gap-2 mt-2'>
                {props.users.map((user) => <DuelBtn battle={props.battle} uid={props.uid} socket={props.socket}
                    oppUid={user}></DuelBtn>)}
            </div>
        </nav>
    )
}
