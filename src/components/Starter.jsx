import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Alert from './Alert';
import useAuth from '../hooks/useAuth';

const Starter = ({ backToDashboard }) => {
    const [starters, setStarters] = useState([]);
    const [btns, setBtns] = useState([]);
    const [error, setError] = useState('');
    const { auth, setAuth } = useAuth();

    const status = {
        'notSelected': 'm-auto font-bold rounded-full p-1 hover:bg-slate-700 hover:cursor-pointer hover:text-slate-900 transition-all',
        'selected': 'm-auto font-bold rounded-full bg-slate-900 hover:cursor-pointer'
    }

    useEffect(() => {
        axios.get('/monsters/starters').then(
            response => setStarters(response.data)
        )
    }, [])

    const handleClick = (e) => {
        if (btns.find((btn) => btn.alt === e.target.alt)) {
            e.target.className = status['notSelected'];
            setBtns(btns.filter((btn) => btn.alt !== e.target.alt));
        }

        else if (btns.length < 3) {
            setBtns(btns.concat(e.target));
            e.target.className = status['selected'];
        }

        else {
            btns[0].className = status['notSelected'];
            setBtns(btns.filter((_btn, idx) => idx !== 0).concat(e.target))
            e.target.className = status['selected'];
        }
    }

    const handleSubmit = async () => {
        if (btns.length < 3) {
            setError('Must Select 3 Pets');
            setTimeout(() => {
                setError('');
            }, 3000)
            return;
        }

        let selectedPets = [];
        btns.map(btn => selectedPets.push(btn.alt));
        await axios.post('/addStarter', { uid: auth?.uid, selectedPets: selectedPets });
        auth['hasReceivedStarters'] = true;
        setAuth(auth);
        backToDashboard(false);
    }

    if (starters) return (
        <div className='absolute backdrop-blur-xl h-screen w-screen'>
            {error ? <Alert message={error} type={'error'} /> : null}
            <div className='flex flex-col gap-4 justify-center h-full w-full'>
                <h1 className='text-white font-bold text-3xl text-center'>Choose Any 3 Starter Pets</h1>
                <div className='bg-yellow-600 mx-auto flex flex-row justify-center gap-6 p-10 rounded-xl flex-wrap'>
                    {starters.map(starter =>
                        <img alt={starter.name} height={'150px'} width={'150px'} src={starter.img_path} className={status['notSelected']} onClick={handleClick} />)
                    }
                </div>
                <button className='text-slate-800 p-2 font-bold rounded-full w-40 mx-auto bg-slate-300 hover:bg-slate-600  hover:text-slate-300 transition-all' onClick={handleSubmit}>Submit</button>
            </div>
        </div >
    )
}

export default Starter