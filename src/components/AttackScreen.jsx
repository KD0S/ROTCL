import { useState } from 'react'

export const AttackScreen = (props) => {

    const [atkSelected, setAtkSelected] = useState(false)
    const [selectedAbility, setSelectedAbility] = useState(null)

    const atkBtnHandler = (e) => {
        setSelectedAbility(e.target.value.split(','))
        setAtkSelected(true)
    }

    const returnBtnHandler = () => {
        setAtkSelected(false)
    }

    const actionHandler = (e) => {
        props.setTurn((props.turn + 1) % props.all_monsters.length)

        setAtkSelected(false)
    }

    return (
        <div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/4 p-3'>
            {atkSelected ? <div className='flex-col justify-center'>
                <div className='flex gap-3'>
                    <button className='text-xl bg-slate-400 px-2 rounded-lg' onClick={returnBtnHandler}>{`⬅`}</button>
                    <p className='text-xl'>Choose Opponent</p>
                </div>
                <div className='flex m-5 gap-6 justify-center'>
                    {props.all_monsters.filter(monster => monster.owner !== props.all_monsters[props.turn].owner).map(monster =>
                        <button className='text-xl bg-slate-400 px-2 rounded-lg' value={monster.id} onClick={actionHandler}>{`${monster.name} | ${monster.owner} : ${monster.hp}`}</button>)}
                </div>
            </div> : props.all_monsters[props.turn].ability.map((ability => <button value={`${ability.type},${ability.dmg}`} onClick={atkBtnHandler} className='text-xl bg-slate-400 p-2 h-20 rounded-lg'>{`${ability.name}:${ability.dmg}`}</button>))
            }
        </div >
    )
}
