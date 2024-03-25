import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { DuelNav } from '../components/DuelNav';
import BattleScreen from './BattleScreen';
import useAuth from '../hooks/useAuth';
import { SideNav } from '../components/SideNav';

const socket = io.connect("http://localhost:3502");

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Dashboard = (props) => {
    const { auth } = useAuth();

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
                    <section className='flex gap-3 p-10 w-3/4'>
                        <h1 className='text-5xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                    </section>
                    <DuelNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></DuelNav>
                </div>
                :
                <BattleScreen battle={setIsBattle} socket={socket}></BattleScreen>
            }
        </div>
    )
}

export default Dashboard