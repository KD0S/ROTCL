import './index.css';
import { PetSlot } from './components/PetSlot';
import monsters_p1 from './constants/monsters_p1';
import monsters_p2 from './constants/monsters_p2';
import monster from './monster';
import { useState } from 'react';
import { AttackScreen } from './components/AttackScreen';

function App() {
  
  const [turn, setTurn] = useState(0)
  const [endgame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(false)

  let p1_monsters = monsters_p1.map((m) => {return new monster(m.hp, m.name, m.ability, m.id, m.owner)})
  let p2_monsters = monsters_p2.map((m) => {return new monster(m.hp, m.name, m.ability, m.id, m.owner)})
  
  const [all_monsters, setAllMonsters] = useState(p1_monsters.concat(p2_monsters))

  return (
    <div className="bg-black h-screen w-screen flex-col rouded">
      {endgame ? <div><div className='absolute z-2 backdrop-blur h-screen w-screen'></div>
      <div className='absolute z-3 h-1/2 w-1/2 left-1/4 top-40 bg-slate-600 rounded-xl'>
        <p className='text-5xl font-bold text-center p-6'>{winner ? "You Win !" : "You Lose !" }</p>
      </div></div> : null}
      <div className='flex h-3/4'>
        <div className='flex-col p-12 w-1/2 h-full'> 
          {all_monsters.filter(monster => monster.owner === 'p1').map((p1_monster) => 
              all_monsters[turn].id === p1_monster.id ?
             <PetSlot orientation="r" details={p1_monster} curr={true} key={p1_monster.name}></PetSlot>
            : <PetSlot orientation="r" details={p1_monster} key={p1_monster.name}></PetSlot>)}
        </div>
        <div className='flex-col p-12 w-1/2 h-full'> 
          {all_monsters.filter(monster => monster.owner === 'p2').map((p2_monster) =>  
              all_monsters[turn].id === p2_monster.id ?
             <PetSlot orientation="l" details={p2_monster} curr={true} key={p2_monster.name}></PetSlot>
            : <PetSlot orientation="l" details={p2_monster} key={p2_monster.name}></PetSlot>)}
        </div>
      </div>
        <AttackScreen all_monsters={all_monsters} setEndGame={setEndGame} setWinner={setWinner} setAllMonsters={setAllMonsters} turn={turn} setTurn={setTurn}></AttackScreen>
    </div>

  );
}

export default App;
