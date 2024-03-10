import { useState } from 'react'

export const AttackScreen = (props) => {

    const [atkSelected, setAtkSelected] = useState(false)
    const [selectedAbility, setSelectedAbility] = useState(null)
    const turnMonster = props.all_monsters.find(monster => monster.id === props.turn)
    const turnOwner = turnMonster.owner


    const atkBtnHandler = (e) => {
        setSelectedAbility(e.target.value.split(','))
        setAtkSelected(true)
    }

    const returnBtnHandler = () => {
        setAtkSelected(false)
    }

    const actionHandler = (e) => {

        props.socket.emit("Ability", [selectedAbility[1], e.target.value]);

        /*let changedMonster = props.all_monsters.find(monster => monster.id === e.target.value)
        if (selectedAbility[0] === 'spt') {
            let updatedHp = (changedMonster.currHp + parseInt(selectedAbility[1]))
            if (updatedHp > changedMonster.hp) updatedHp = changedMonster.hp
            changedMonster.currHp = updatedHp
        } else {
            changedMonster.currHp = changedMonster.currHp - parseInt(selectedAbility[1]) % changedMonster.hp
        }
        let updatedMonsters = props.all_monsters.map(monster => monster.id === changedMonster.id ? changedMonster : monster)
        updatedMonsters = updatedMonsters.filter(monster => monster.currHp > 0)

        let p1Monsters = updatedMonsters.filter(m => m.owner === 'p1').length
        let p2Monsters = updatedMonsters.filter(m => m.owner === 'p2').length

        if (p1Monsters === 0 || p2Monsters === 0) {
            props.setEndGame(true)
            props.setWinner(p1Monsters > p2Monsters)
        }

        props.setAllMonsters(updatedMonsters)
        props.setTurn((props.turn + 1) % updatedMonsters.length)
        setAtkSelected(false)*/

        //props.setTurn((props.turn + 1) % updatedMonsters.length)
        setAtkSelected(false)
    }

    if (turnOwner !== props.client) {
        return (
            <div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/4 p-3'>
                <p className='font-bold text-3xl'>Waiting for Opponent to make a move......</p>
            </div>
        )
    }
    else return (
        <div className='flex gap-6 justify-center bg-blue-900 w-screen h-1/4 p-3'>
            {atkSelected ?
                <div className='flex-col justify-center'>
                    <div className='flex gap-3'>
                        <button className='text-xl bg-slate-400 px-2 rounded-lg' onClick={returnBtnHandler}>{`⬅`}</button>
                        <p className='text-xl'>Choose Opponent</p>
                    </div>
                    <div className='flex m-5 gap-6 justify-center'>
                        {
                            selectedAbility[0] === 'atk' ?
                                props.all_monsters.filter(monster => monster.owner !== turnOwner).map(monster =>
                                    <button className='text-xl bg-slate-400 px-2 rounded-lg' value={monster.id} onClick={actionHandler}>{`${monster.name} | ${monster.owner} : ${monster.currHp}`}</button>)
                                :
                                props.all_monsters.filter(monster => monster.owner === turnOwner).map(monster =>
                                    <button className='text-xl bg-slate-400 px-2 rounded-lg' value={monster.id} onClick={actionHandler}>{`${monster.name} | ${monster.owner} : ${monster.currHp}`}</button>)
                        }
                    </div>
                </div> : props.all_monsters[props.turn].ability.map((ability => <button value={`${ability.type},${ability.dmg}`} onClick={atkBtnHandler} className='text-xl bg-slate-400 p-2 h-20 rounded-lg'>{`${ability.name}:${ability.dmg}`}</button>))
            }
        </div >
    )
}
