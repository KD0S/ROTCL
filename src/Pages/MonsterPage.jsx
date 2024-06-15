import { useState, useEffect } from 'react'
import axios from '../api/axios'
import PetDetails from '../components/PetDetails'
import Spinner from '../components/Spinner';

const MonsterPage = ({ auth }) => {
    const [updateTrigger, setUpdateTrigger] = useState(true);
    const [wait, setWait] = useState(true)
    const [partyLen, setPartyLen] = useState(0);
    const [petsDetails, setPetsDetails] = useState([]);
    const [abilityDetails, setAbilityDetails] = useState({});
    const [petDetailsModal, setPetDetailsModal] = useState('hidden');
    const [selectedPetDetails, setSelectedPetDetails] = useState([]);
    const [selectedPetAbilityDetails, setSelectedPetAbilityDetails] = useState([]);

    useEffect(() => {
        const fetchPets = () => {
            axios.get(`pets/player/${auth.uid}`).then(
                response => {
                    setPetsDetails(response.data);
                    setWait(false);
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
        setPartyLen(petsDetails.filter(pet => pet.in_party).length);
        abilityDetailsSetter();
    }, [petsDetails])


    const handleUpdateTrigger = () => {
        setUpdateTrigger(prev => !prev);
    }

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
                {petDetailsModal === 'hidden' ? null : <PetDetails partyLen={partyLen} setRefresh={handleUpdateTrigger} display={petDetailsModal} handleModal={handleModal} petDetails={selectedPetDetails} abilityDetails={selectedPetAbilityDetails}></PetDetails>}
                {!wait ?
                    <div>
                        <div className='p-2'>
                            <h1 className='text-2xl font-bold text-slate-300'>Party</h1>
                            <div className='flex flex-wrap gap-6 p-4'>
                                {petsDetails.filter(pet => pet.in_party).map(pet =>
                                    < img id={pet.mid} src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center hover:cursor-pointer'
                                        onClick={handleModal}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='p-2'>
                            <h1 className='text-2xl font-bold text-slate-300'>Trained Pets</h1>
                            <div className='flex flex-wrap gap-6 p-4'>
                                {petsDetails.filter(pet => pet.is_trained && !pet.in_party).map(pet =>
                                    < img id={pet.mid} src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center hover:cursor-pointer'
                                        onClick={handleModal}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='p-2'>
                            <h1 className='text-2xl font-bold text-slate-300'>Untrained Pets</h1>
                            <div className='flex flex-wrap gap-6 p-4'>
                                {petsDetails.filter(pet => !pet.is_trained).map(pet =>
                                    < img id={pet.mid} src={pet.monster_index.img_path} alt={pet.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center hover:cursor-pointer'
                                        onClick={handleModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center mt-40 m-auto'>
                        <Spinner h={10} w={10} b={8} color={'fill-yellow-400'} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MonsterPage