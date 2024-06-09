import React from 'react'

const LeaderBoardItem = ({ idx, uid, wins, losses, exp }) => {
    return (
        <div className='bg-yellow-500 rounded-md flex gap-6 text-2xl text-slate-800 p-4'>
            <p className='font-bold'>{idx}</p>
            <p>{uid}</p>
            <p>{exp}</p>
        </div>
    )
}

export default LeaderBoardItem