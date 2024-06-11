import React from 'react'

const LeaderBoardItem = ({ idx, uid, wins, losses, exp }) => {
    return (
        <div className='bg-yellow-500 rounded-md flex gap-4 text-2xl text-slate-800 p-3 justify-center'>
            <p className='font-bold'>{idx}</p>
            <p className='text-xl'>{uid}</p>
            <p className='text-lg font-light flex'>
                <p>{exp}</p>
                <p className='text-sm'>pts</p>
            </p>
        </div>
    )
}

export default LeaderBoardItem