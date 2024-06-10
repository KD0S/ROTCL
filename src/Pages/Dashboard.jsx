import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Starter from '../components/Starter';
import Stats from '../components/Stats';
import Spinner from '../components/Spinner';

const Dashboard = ({ auth }) => {
    const [starters, setStarters] = useState(false);
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        if (!auth?.hasReceivedStarters) setStarters(true)
    }, [auth])

    useEffect(() => {
        axios.get(`/stats/${auth.uid}`).then(
            data => setPlayerStats(data.data)
        )
    }, [auth.uid])

    return (
        <div className='bg-slate-900'>
            {starters ?
                <Starter backToDashboard={setStarters} />
                : null
            }
            <div>
                <h1 className='text-5xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                {
                    playerStats ?
                        <Stats starters={starters} playerStats={playerStats} />
                        :
                        <div className='flex justify-center mt-40 m-auto'>
                            <Spinner h={20} w={20} b={8} color={'fill-yellow-400'} />
                        </div>
                }
            </div>
        </div >
    )
}

export default Dashboard

