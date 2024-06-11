import { useState } from 'react'
import Draggable from './Draggable'

export const AttackScreen = (props) => {

    const [atkSelected, setAtkSelected] = useState(false)
    const turnMonster = props.all_monsters.find(monster => monster.id === props.turn)
    const turnOwner = turnMonster.owner

    const returnBtnHandler = () => {
        setAtkSelected(false)
    }

    if (turnOwner !== props.client) {
        return (
            <div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/5 p-3'>
                <p className='font-bold text-3xl'>Waiting for Opponent to make a move......</p>
            </div>
        )
    }

    else return (
        < div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/5 p-3' >
            {
                atkSelected ?
                    <div className='flex-col justify-center'>
                        < div className='flex gap-3' >
                            <button className='text-xl bg-slate-400 px-2 rounded-lg' onClick={returnBtnHandler}>{`⬅`}</button>
                            <p className='text-xl'>Choose Opponent</p>
                        </div >
                    </div > : turnMonster.ability.map(
                        (ability => <Draggable id={ability.abilities.name} value={`${ability.abilities.target}`}>{`${ability.abilities.name}: 🔋 ${ability.abilities.stamina}`}</Draggable>)
                    )
            }
        </div >

    )
}
