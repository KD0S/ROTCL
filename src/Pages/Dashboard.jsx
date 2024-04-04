import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { DuelNav } from '../components/DuelNav';
import BattleScreen from './BattleScreen';
import useAuth from '../hooks/useAuth';
import { SideNav } from '../components/SideNav';
import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

const socket = io.connect("http://localhost:3502");

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Dashboard = (props) => {
    const { auth } = useAuth();
    const [starters, setStarters] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        if (!auth.hasReceivedStarters) {
            axios.get('/monsters/starters').then(
                data => setStarters(data.data)
            )
        }
    }, [auth?.hasReceivedStarters])

    useEffect(() => {
        axios.get(`/stats/${auth.uid}`).then(
            data => setPlayerStats(data.data)
        )
    }, [auth.uid])

    // useEffect(() => {
    //     if (starters)
    //         alert(JSON.stringify(starters))
    // }, [starters])

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
            {!isBattle ?
                <div className='flex'>
                    <SideNav socket={socket}></SideNav>
                    <section className='flex flex-col gap-3 p-10 w-3/4'>
                        <h1 className='text-5xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                        {
                            playerStats ?
                                <section>
                                    <section className='w-full mt-10'>
                                        <div className='rounded-2xl h-10 bg-slate-700 w-full p-2'>
                                            <div className='rounded-2xl h-6 bg-yellow-600 w-full 
                                                text-center text-white font-bold'
                                                style={{ width: `${(playerStats.exp + 30 / 100) * 100}%` }}>
                                                {`EXP: ${playerStats.exp}`}
                                            </div>
                                        </div>
                                    </section>
                                    <section className='w-full mt-5'>
                                        <h1 className='text-yellow-600 text-2xl font-bold'>Battle Stats</h1>
                                        <div className='flex gap-4 mt-4'>
                                            <div className='w-40 bg-slate-800 rounded-xl text-yellow-600 text-center font-bold p-5'>
                                                <FontAwesomeIcon className="text-yellow-400 text-lg mr-3" icon={faCrown}></FontAwesomeIcon>
                                                {`Wins : ${playerStats.wins}`}
                                            </div>
                                            <div className='w-40 bg-slate-800 rounded-xl text-yellow-600 text-center font-bold p-5'>
                                                <FontAwesomeIcon className="text-red-600 text-xl mr-3" icon={faHeartBroken}></FontAwesomeIcon>
                                                {`Losses : ${playerStats.losses}`}
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                : <p className='text-yellow-600 font-bold'>Loading Stats....</p>
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