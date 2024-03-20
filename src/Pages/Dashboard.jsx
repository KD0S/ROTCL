import '../styles/index.css';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { SideNav } from '../components/SideNav';
import BattleScreen from './BattleScreen';

const socket = io.connect("http://localhost:3502");

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Dashboard = (props) => {
    const [usersList, setUsersList] = useState([]);
    const [isBattle, setIsBattle] = useState(false)
    socket.on("update user", (users) => {
        setUsersList(users.filter(user => user !== props.uid))
    })

    socket.on("duelRequest", () => {
        setIsBattle(true)
    })

    useEffect(() => {
        socket.emit('join server', props.uid);
    }, [props.uid])

    return (
        <div className='bg-slate-900 h-screen'>
            <Header></Header>
            {!isBattle ?
                <div className='flex mx-20 mt-10'>
                    <section className=''>
                        <h1 className='text-4xl font-bold text-yellow-600'>{`Welcome, ${props.uid}`}</h1>
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