import { useEffect, useState } from 'react';
import { DuelNav } from '../components/DuelNav';
import BattleScreen from './BattleScreen';
import useAuth from '../hooks/useAuth';
import { SideNav } from '../components/SideNav';
import Starter from '../components/Starter';
import { io } from 'socket.io-client';
import Dashboard from './Dashboard';
import MonsterPage from './MonsterPage';
import Leaderboard from './Leaderboard';

const socket = io.connect('https://rotcl-socket.onrender.com')

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Home = ({ page }) => {
    const { auth } = useAuth();
    const [starters, setStarters] = useState(false);

    useEffect(() => {
        if (!auth?.hasReceivedStarters) setStarters(true)
    }, [auth])

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

    const pages = {
        'dashboard': <Dashboard auth={auth} />,
        'monsterPage': <MonsterPage auth={auth} />,
        'leaderboard': <Leaderboard auth={auth} />
    }

    return (
        <div className='bg-slate-900 max-h'>
            {starters ?
                <Starter backToDashboard={setStarters} />
                : null
            }
            {!isBattle ?
                <div className='flex'>
                    <SideNav socket={socket}></SideNav>
                    <section className='p-10 w-3/4'>
                        {pages[page]}
                    </section>
                    <DuelNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></DuelNav>
                </div>
                :
                <BattleScreen battle={setIsBattle} socket={socket}></BattleScreen>
            }
        </div >
    )
}

export default Home
