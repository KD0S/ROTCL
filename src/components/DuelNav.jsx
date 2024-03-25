import React from 'react'
import { DuelBtn } from './DuelBtn'

export const DuelNav = (props) => {
    return (
        <nav className='h-screen w-1/6 bg-slate-800 p-3'>
            <h1 className='text-center font-bold text-yellow-600 text-3xl'>Duel!</h1>
            <div className='flex flex-col gap-2 mt-2'>
                {props.users.map((user) => <DuelBtn battle={props.battle} uid={props.uid} socket={props.socket}
                    oppUid={user}></DuelBtn>)}
            </div>
        </nav>
    )
}
