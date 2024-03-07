import './index.css';
import { PetSlot } from './components/PetSlot';
import monsters from './constants/monsters';
import monster from './monster';

function App() {
  
  let p1_monsters = monsters.map((m) => {return new monster(m.hp, m.name)})
  //let p2_monsters = 

  return (
    <div className="bg-blue-800 h-screen w-screen flex">
      <div className='flex-col p-12 w-1/2 h-screen'> 
        {p1_monsters.map((p1_monster) => <PetSlot orientation="r" details={p1_monster} key={p1_monster.name}></PetSlot>)}
      </div>
    <div className='flex-col p-12 w-1/2 h-screen'> 
        {p1_monsters.map((p1_monster) => <PetSlot orientation="l" details={p1_monster} key={p1_monster.name}></PetSlot>)}
    </div>

    </div>

  );
}

export default App;
