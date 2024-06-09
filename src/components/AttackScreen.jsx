import { useState } from 'react'

export const AttackScreen = (props) => {

    const [atkSelected, setAtkSelected] = useState(false)
    const [selectedAbility, setSelectedAbility] = useState(null)
    console.log(props.turn)
    const turnMonster = props.all_monsters.find(monster => monster.id === props.turn)
    console.log("turn monster:")
    console.log(turnMonster.ability)
    const turnOwner = turnMonster.owner

    console.log(turnOwner);

    const atkBtnHandler = (e) => {
        setSelectedAbility(e.target.value.split(','))
        console.log(turnMonster.ability)
        //console.log("selectedAbility = " + selectedAbility[0])
        setAtkSelected(true)
    }

    const returnBtnHandler = () => {
        setAtkSelected(false)
    }

    const actionHandler = (e) => {

        props.socket.emit("Ability", [selectedAbility[1], e.target.value]);
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
        <div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/5 p-3'>
            {atkSelected ?
                <div className='flex-col justify-center'>
                    <div className='flex gap-3'>
                        <button className='text-xl bg-slate-400 px-2 rounded-lg' onClick={returnBtnHandler}>{`⬅`}</button>
                        <p className='text-xl'>Choose Opponent</p>
                    </div>
                    <div className='flex m-5 gap-6 justify-center'>
                        {
                            selectedAbility[0] === 'target' || selectedAbility[0] === 'aoe' ?
                                props.all_monsters.filter(monster => monster.owner !== turnOwner).map(monster =>
                                    <button className='text-xl bg-slate-400 px-2 rounded-lg' value={monster.id} onClick={actionHandler}>{`${monster.name} | ${monster.owner} : ${monster.currHp}`}</button>)
                                :
                                props.all_monsters.filter(monster => monster.owner === turnOwner).map(monster =>
                                    <button className='text-xl bg-slate-400 px-2 rounded-lg' value={monster.id} onClick={actionHandler}>{`${monster.name} | ${monster.owner} : ${monster.currHp}`}</button>)
                        }
                    </div>
                </div> : turnMonster.ability.map((ability => <button value={`${ability.abilities.target},${ability.abilities.name}`} onClick={atkBtnHandler} className='text-xl bg-slate-400 p-2 h-20 rounded-lg'>{`${ability.abilities.name}: 🔋 ${ability.abilities.stamina}`}</button>))
            }
        </div >
    )
}
