import '../styles/index.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { SideNav } from '../components/SideNav';
import BattleScreen from './BattleScreen';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

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
            <Header />
            {!isBattle ?
                <div className='flex mx-20 mt-10'>
                    <section className=''>
                        <h1 className='text-4xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                    </section>
                    <SideNav battle={setIsBattle} users={usersList} uid={props.uid} socket={socket}></SideNav>
                </div>
                :
                <BattleScreen battle={setIsBattle} socket={socket}></BattleScreen>
            }
        </div>
    )
}

export default Dashboard