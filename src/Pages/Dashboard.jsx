import '../styles/index.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { SideNav } from '../components/SideNav';
import BattleScreen from './BattleScreen';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const socket = io.connect("http://localhost:3502");

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const Dashboard = (props) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

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
                    <section className='flex gap-3'>
                        <h1 className='text-4xl font-bold text-yellow-600'>{`Welcome, ${auth.uid}`}</h1>
                        <button className='bg-yellow-600 m-auto rounded-lg h-3/5 px-2 text-white text-sm font-bold
                         hover:bg-red-600' onClick={signOut}>Sign Out</button>
                    </section>
                    <SideNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></SideNav>
                </div>
                :
                <BattleScreen battle={setIsBattle} socket={socket}></BattleScreen>
            }
        </div>
    )
}

export default Dashboard