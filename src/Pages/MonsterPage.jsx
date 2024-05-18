import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { SideNav } from '../components/SideNav'
import { DuelNav } from '../components/DuelNav'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const socket = io.connect('localhost:3500')

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const MonsterPage = () => {

    const [usersList, setUsersList] = useState([]);
    const [, setIsBattle] = useState(false);
    const [pets, setPets] = useState([]);
    const { auth } = useAuth()

    socket.on("update user", (users) => {
        setUsersList(users.filter(user => user !== auth.uid))
    });

    socket.on("duelRequest", () => {
        setIsBattle(true)
    });

    useEffect(() => {
        axios.get(`pets/player/${auth.uid}`).then(
            response => {
                console.log(response.data);
                setPets(response.data)
            }
        )
    }, [auth?.uid])

    useEffect(() => {
        socket.emit('join server', auth.uid);
    }, [auth]);

    return (
        <div className='flex'>
            <SideNav socket={socket}></SideNav>
            <div className='bg-slate-900 w-full p-10'>
                <div className='m-10'>
                    <h1 className='text-2xl font-bold text-slate-300'>Trained Pets</h1>
                    <div className='flex gap-6 p-4'>
                        {pets ?
                            pets.filter(pet => pet.is_trained).map(pet =>
                                < img src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center'
                                />
                            )
                            : null
                        }
                    </div>
                </div>
                <div className='m-10'>
                    <h1 className='text-2xl font-bold text-slate-300'>Untrained Pets</h1>
                    <div className='flex gap-6 p-4'>
                        {pets ?
                            pets.filter(pet => !pet.is_trained).map(pet =>
                                < img src={pet.monster_indeximg_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center'
                                />
                            )
                            : null
                        }
                    </div>
                </div>
            </div>
            <DuelNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></DuelNav>
        </div>
    )
}

export default MonsterPage