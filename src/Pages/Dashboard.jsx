import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Stats from '../components/Stats';
import Spinner from '../components/Spinner';

const Dashboard = ({ auth }) => {
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        axios.get(`/stats/${auth.uid}`).then(
            data => setPlayerStats(data.data)
        )
    }, [auth.uid])

    return (
        <div className='bg-slate-900'>
            <div>
                <h1 className='text-5xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                {
                    playerStats ?
                        <Stats playerStats={playerStats} />
                        :
                        <div className='flex justify-center mt-40 m-auto'>
                            <Spinner h={10} w={10} b={8} color={'fill-yellow-400'} />
                        </div>
                }
            </div>
        </div >
    )
}

export default Dashboard

