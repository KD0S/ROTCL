import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { SideNav } from '../components/SideNav'
import { DuelNav } from '../components/DuelNav'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import PetDetails from '../components/PetDetails'

const socket = io.connect('localhost:3500')

socket.on("duelRequest", (duelRequest) => {
    console.log("numoftimes");
    socket.emit("duelAccept", (duelRequest));
})

const MonsterPage = () => {
    const { auth } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(true);
    const [, setIsBattle] = useState(false);
    const [petsDetails, setPetsDetails] = useState([]);
    const [abilityDetails, setAbilityDetails] = useState({});
    const [petDetailsModal, setPetDetailsModal] = useState('hidden');
    const [selectedPetDetails, setSelectedPetDetails] = useState([]);
    const [selectedPetAbilityDetails, setSelectedPetAbilityDetails] = useState([]);

    socket.on("update user", (users) => {
        setUsersList(users.filter(user => user !== auth.uid))
    });

    socket.on("duelRequest", () => {
        setIsBattle(true)
    });

    useEffect(() => {
        const fetchPets = () => {
            axios.get(`pets/player/${auth.uid}`).then(
                response => {
                    setPetsDetails(response.data)
                }
            )
        }
        fetchPets();
    }, [auth?.uid, updateTrigger])

    useEffect(() => {
        let allDetails = {};
        const abilityDetailsSetter = () => {
            petsDetails.forEach(pet => {
                axios.get(`ability/petAll/${pet.mid}`).then(response => {
                    allDetails[pet.mid] = response.data;
                })
            })
            setAbilityDetails(allDetails);
        }
        abilityDetailsSetter();
    }, [petsDetails])


    const handleUpdateTrigger = () => {
        setUpdateTrigger(prev => !prev);
    }


    useEffect(() => {
        socket.emit('join server', auth.uid);
    }, [auth]);

    const handleModal = (e) => {
        if (petDetailsModal === 'hidden') {
            setSelectedPetDetails(petsDetails.find(pet => pet.mid === e.target.id));
            setSelectedPetAbilityDetails(abilityDetails[e.target.id]);
        }
        petDetailsModal === 'hidden' ? setPetDetailsModal('block') : setPetDetailsModal('hidden');
    }

    return (
        <div className='bg-slate-900'>
            <div className='flex'>
                <SideNav socket={socket}></SideNav>
                {petDetailsModal === 'hidden' ? null : <PetDetails setRefresh={handleUpdateTrigger} display={petDetailsModal} handleModal={handleModal} petDetails={selectedPetDetails} abilityDetails={selectedPetAbilityDetails}></PetDetails>}
                <div className='w-3/4'>
                    <div className='p-10'>
                        <h1 className='text-2xl font-bold text-slate-300'>Trained Pets</h1>
                        <div className='flex gap-6 p-4'>
                            {petsDetails ?
                                petsDetails.filter(pet => pet.is_trained).map(pet =>
                                    < img id={pet.mid} src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center hover:cursor-pointer'
                                        onClick={handleModal}
                                    />
                                )
                                : null
                            }
                        </div>
                    </div>
                    <div className='p-10'>
                        <h1 className='text-2xl font-bold text-slate-300'>Untrained Pets</h1>
                        <div className='flex gap-6 p-4'>
                            {petsDetails ?
                                petsDetails.filter(pet => !pet.is_trained).map(pet =>
                                    < img id={pet.mid} src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center hover:cursor-pointer'
                                        onClick={handleModal}
                                    />
                                )
                                : null
                            }
                        </div>
                    </div>
                </div>
                <DuelNav battle={setIsBattle} users={usersList} uid={auth.uid} socket={socket}></DuelNav>
            </div>
        </div>
    )
}

export default MonsterPage