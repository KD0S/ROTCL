import '../styles/index.css';
import { PetSlot } from '../components/PetSlot';
import { AttackScreen } from '../components/AttackScreen';
import { useState } from 'react';

const BattleScreen = (props) => {
  const [turn, setTurn] = useState(null)
  const [endgame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(false)
  const [clientId, setClientId] = useState(null)

  const [all_monsters, setAllMonsters] = useState(null)

  props.socket.on("setState", (monsters) => {
    setAllMonsters(monsters[0].concat(monsters[1]))
    setTurn(monsters[2])
    setClientId(monsters[0][0].owner)

    const p1_m = monsters[0].filter(m => m.status === 'alive')
    const p2_m = monsters[1].filter(m => m.status === 'alive')
    if (p1_m.length === 0 || p2_m.length === 0) {
      setEndGame(true)
      p1_m.length > p2_m.length ? setWinner(true) : setWinner(false)
    }
  });

  if (!all_monsters) return <div>
  </div>

  else return (
    <div className="bg-black h-screen w-screen flex-col rouded">

      {endgame ? <div><div className='absolute z-2 backdrop-blur h-screen w-screen'></div>
        <div className='absolute z-3 h-1/2 w-1/2 left-1/4 top-40 bg-slate-600 rounded-xl'>
          <p className='text-5xl font-bold text-center p-6'>{winner ? "You Win !" : "You Lose !"}</p>
        </div></div> : null}
      <div className='flex h-3/4'>
        <div className='flex-col p-12 w-1/2 h-full'>
          {all_monsters.filter(monster => monster.owner === clientId && monster.status === "alive").map((p1_monster) =>
            <PetSlot orientation="r" details={p1_monster} curr={turn === p1_monster.id ? true : false} key={p1_monster.name}></PetSlot>)}
        </div>
        <div className='flex-col p-12 w-1/2 h-full'>
          {all_monsters.filter(monster => monster.owner !== clientId && monster.status === "alive").map((p2_monster) =>
            <PetSlot orientation="l" details={p2_monster} curr={turn === p2_monster.id ? true : false} key={p2_monster.name}></PetSlot>)}
        </div>
      </div>
      <AttackScreen socket={props.socket} client={clientId} all_monsters={all_monsters}
        setAllMonsters={setAllMonsters} turn={turn} setTurn={setTurn}></AttackScreen>
    </div >

  );
}

export default BattleScreen;
