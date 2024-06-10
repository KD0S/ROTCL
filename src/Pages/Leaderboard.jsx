import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Spinner from '../components/Spinner'
import LeaderBoardItem from '../components/LeaderBoardItem'

const Leaderboard = () => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        async function fetch() {
            const response = await axios.get('http://localhost:3001/stats');
            setPlayers(response.data);
        }
        fetch();
    }, [])

    return (
        <div>
            <h1 className='text-5xl text-center font-bold text-yellow-600'>{`Leaderboard`}</h1>
            <div className='flex p-6'>
                {
                    players.length === 0 ?
                        <div className='flex justify-center mt-40 m-auto'>
                            <Spinner h={20} w={20} b={8} color={'text-yellow-400'} />
                        </div>
                        :
                        <div className='flex gap-2 flex-col mx-auto'>
                            {players.map((player, idx) => <LeaderBoardItem uid={player.uid} idx={idx + 1} exp={player.exp} />)}
                        </div>
                }
            </div>
        </div>
    )
}

export default Leaderboard