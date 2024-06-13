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
import { config } from '../config';
import DuelRequestModal from '../components/DuelRequestModal';

const socket = io.connect(config.SOCKET_URL)


const Home = ({ page }) => {

    const [duelR, setDuelR] = useState(null);

    const [duelRequestModal, setDuelRequestModal] = useState('hidden');

    const handleModal = (e) => {
        duelRequestModal === 'hidden' ? setDuelRequestModal('block') : setDuelRequestModal('hidden');
    }

    const acceptDuelRequest = () => {
        setDuelRequestModal('hidden')
        socket.emit("duelAccept", (duelR));
    }


    socket.on("duelRequest", (duelRequest) => {

        setDuelR(duelRequest)
        handleModal()
        
    })

    
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
        //setIsBattle(true)
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
            {duelRequestModal === 'hidden' ? null : <DuelRequestModal className='z-10' duelRequest={ duelR } display={duelRequestModal} handleModal={handleModal} duelAccept= {acceptDuelRequest}></DuelRequestModal>}
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
