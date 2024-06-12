import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import Spinner from '../components/Spinner'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LeaderBoardItem from '../components/LeaderBoardItem'
import { config } from '../config'

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [playersToBeShown, setPlayersToBeShown] = useState([])
    const [currIdx, setCurrIdx] = useState(0);

    useEffect(() => {
        async function fetch() {
            const response = await axios.get(`${config.SERVER_URL}/stats`);
            setPlayers(response.data);
        }
        fetch();
    }, [])

    useEffect(() => {
        setPlayersToBeShown(players.filter((player, idx) => idx >= currIdx && idx < currIdx + 8))
    }, [currIdx, players])

    const handleIdxIncrement = () => setCurrIdx(prev => (prev + 8) > (players.length - 8) ? (players.length - 8) : (prev + 8));
    const handleIdxDecrement = () => setCurrIdx(prev => (prev - 8) < 0 ? 0 : (prev - 8));

    return (
        <div className='max-h-max'>
            <h1 className='text-5xl text-center font-bold text-yellow-600'>{`Leaderboard`}</h1>
            <div className='flex p-6'>
                {
                    players.length === 0 ?
                        <div className='h-flex justify-center mt-40 m-auto'>
                            <Spinner h={20} w={20} color={'fill-yellow-400'} />
                        </div>
                        :
                        <div className='mx-auto'>
                            <div className='flex flex-col gap-2'>
                                {playersToBeShown.map((player, idx) => <LeaderBoardItem uid={player.uid} idx={idx + 1} exp={player.exp} />)}
                            </div>
                            <div className='flex justify-center gap-6 p-4'>
                                <button onClick={handleIdxDecrement}>
                                    <FontAwesomeIcon className="text-yellow-400 text-3xl" icon={faCaretLeft} />
                                </button>
                                <button onClick={handleIdxIncrement}>
                                    <FontAwesomeIcon className="text-yellow-400 text-3xl" icon={faCaretRight} />
                                </button>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Leaderboard