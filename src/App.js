import './index.css';
import { PetSlot } from './components/PetSlot';
import { AttackScreen } from './components/AttackScreen';
import UsersList from './components/UsersList';
import io from "socket.io-client";
import { useState } from 'react';
const socket = io.connect("http://localhost:3502")

socket.on("duelRequest", (duelRequest) =>{
  console.log("numoftimes")
  socket.emit("duelAccept", (duelRequest))
})

function App() {

  const [turn, setTurn] = useState(null)
  const [endgame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(false)
  const [clientId, setClientId] = useState(null)
  
  const [all_monsters, setAllMonsters] = useState(null)

  const [inputValue, setInputValue] = useState('');

  const [userList, setUserList] = useState(null);

  const [myUsername, setUsername] = useState(null);

  const handleDuelClick = (username) => {
    // Emit socket event "duel" with the username
    console.log(`Sending duel request ${myUsername} to ${username}`);
    socket.emit('duel', {player: myUsername, opponent: username})
    // Your socket.emit('duel', username) logic here
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEmit = () => {
    if (inputValue.trim() !== '') {
      setUsername(inputValue.trim())
      socket.emit("join server", inputValue.trim()); // Emit the value to the server
      setInputValue(''); // Clear the input box after emitting
    }
  };


  socket.on("setState", (monsters) =>{
    setAllMonsters(monsters[0].concat(monsters[1]))
    setTurn(monsters[2])    
    setClientId(monsters[0][0].owner)

    const p1_m = monsters[0].filter(m => m.status === 'alive')
    const p2_m = monsters[1].filter(m => m.status === 'alive')
    if(p1_m.length === 0 || p2_m.length === 0) {
      setEndGame(true)
      p1_m.length > p2_m.length ? setWinner(true) : setWinner(false)
    }
  });

  socket.on("update user", (users) =>{
    console.log(users)
    setUserList(users)
  });

  if (!all_monsters) return <div>
    <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Enter your value" 
      />
      <button onClick={handleEmit}>Send Value</button>
      <h1>Users List</h1>
      <UsersList users={userList} onDuelClick={handleDuelClick} />
  </div>
  else return (
    <div className="bg-black h-screen w-screen flex-col rouded">
      
      {endgame ? <div><div className='absolute z-2 backdrop-blur h-screen w-screen'></div>
      <div className='absolute z-3 h-1/2 w-1/2 left-1/4 top-40 bg-slate-600 rounded-xl'>
        <p className='text-5xl font-bold text-center p-6'>{winner ? "You Win !" : "You Lose !" }</p>
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
        <AttackScreen socket={socket} client={clientId} all_monsters={all_monsters}  
        setAllMonsters={setAllMonsters} turn={turn} setTurn={setTurn}></AttackScreen>
    </div>

  );
}

export default App;
