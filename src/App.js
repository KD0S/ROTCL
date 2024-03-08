import './index.css';
import { PetSlot } from './components/PetSlot';
import monsters_p1 from './constants/monsters_p1';
import monsters_p2 from './constants/monsters_p2';
import monster from './monster';
import { useState } from 'react';
import { AttackScreen } from './components/AttackScreen';

function App() {
  
  const [turn, setTurn] = useState(0)

  let p1_monsters = monsters_p1.map((m) => {return new monster(m.hp, m.name, m.ability, m.id, m.owner)})
  let p2_monsters = monsters_p2.map((m) => {return new monster(m.hp, m.name, m.ability, m.id, m.owner)})
  let all_monsters = p1_monsters.concat(p2_monsters)

  return (
    <div className="bg-black h-screen w-screen flex-col">
      <div className='flex h-3/4'>
        <div className='flex-col p-12 w-1/2 h-full'> 
          {p1_monsters.map((p1_monster) => <PetSlot orientation="r" details={p1_monster} key={p1_monster.name}></PetSlot>)}
        </div>
        <div className='flex-col p-12 w-1/2 h-full'> 
          {p2_monsters.map((p2_monster) => <PetSlot orientation="l" details={p2_monster} key={p2_monster.name}></PetSlot>)}
        </div>
      </div>
        <AttackScreen all_monsters={all_monsters} turn={turn} setTurn={setTurn}></AttackScreen>
    </div>

  );
}

export default App;
