import { useEffect, useState } from 'react';
import { DuelNav } from '../components/DuelNav';
import BattleScreen from './BattleScreen';
import useAuth from '../hooks/useAuth';
import { SideNav } from '../components/SideNav';
import axios from '../api/axios';
import Starter from '../components/Starter';
import Stats from '../components/Stats';
import { io } from 'socket.io-client';

const socket = io.connect('localhost:3500')

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Dashboard = () => {
    const { auth } = useAuth();
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

    const [usersList, setUsersList] = useState([]);
    const [isBattle, setIsBattle] = useState(false);

    socket.on("update user", (users) => {
        setUsersList(users.filter(user => user !== auth.uid))
    });

    socket.on("duelRequest", () => {
        setIsBattle(true)
    });

    useEffect(() => {
        socket.emit('join server', auth.uid);
    }, [auth]);

    return (
        <div className='bg-slate-900 h-screen'>
            {starters ?
                <Starter backToDashboard={setStarters} />
                : null
            }
            {!isBattle ?
                <div className='flex'>
                    <SideNav socket={socket}></SideNav>
                    <section className='flex flex-col gap-3 p-10 w-3/4'>
                        <h1 className='text-5xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                        {
                            playerStats ?
                                <Stats starters={starters} playerStats={playerStats} />
                                : <p className='text-yellow-600 font-bold text-2xl'>Loading Stats....</p>
                        }
                    </section>
                    <DuelNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></DuelNav>
                </div>
                :
                <BattleScreen battle={setIsBattle} socket={socket}></BattleScreen>
            }
        </div >
    )
}

export default Dashboard
